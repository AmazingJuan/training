<?php
/**
 * PQRS endpoint on the production host. The site is prerendered to static files
 * and the host only runs PHP, so this is the PHP twin of server/api/pqrs.post.ts
 * (which still answers in `nuxt dev`). Keep the two in step with
 * shared/utils/pqrs.ts: same limits, same rules, same payload to the webhook.
 *
 * The webhook URL lives outside the web root, in ~/pqrs.config.php:
 *   <?php return ['webhook' => 'https://hook.example.com/...'];
 * Without it the endpoint answers 503 and the form points people to the phone
 * and e-mail instead.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $message, ?array $data = null): void
{
    reply($status, ['statusCode' => $status, 'statusMessage' => $message] + ($data ? ['data' => $data] : []));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method Not Allowed');
}

$kinds = [
    'peticion' => 'Petición', 'queja' => 'Queja', 'reclamo' => 'Reclamo', 'apelacion' => 'Apelación',
    'no-conforme' => 'Servicio no conforme', 'mejora' => 'Sugerencia de mejora', 'observacion' => 'Observación',
    'felicitacion' => 'Felicitación', 'otro' => 'Otro',
];
$formalKinds = ['peticion', 'queja', 'reclamo', 'apelacion', 'no-conforme'];
$sources = [
    'servicio' => 'La prestación de un servicio', 'llamada' => 'Una llamada o la atención telefónica',
    'datos' => 'El manejo de mis datos personales', 'escrita' => 'Una comunicación escrita (correo, carta o documento)',
];
$files = [
    'max' => 4,
    'totalBytes' => 2.5 * 1024 * 1024,
    'types' => [
        'application/pdf', 'image/jpeg', 'image/png',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
];
$messages = [
    'tipo' => ['es' => 'Seleccione qué desea comunicarnos.', 'en' => 'Please select what you would like to tell us.'],
    'tipoOtro' => ['es' => 'Indique de qué se trata su solicitud.', 'en' => 'Please tell us what your request is about.'],
    'fuente' => ['es' => 'Seleccione con qué está relacionada su solicitud.', 'en' => 'Please select what your request relates to.'],
    'fechaServicio' => ['es' => 'La fecha del servicio no puede ser posterior a hoy.', 'en' => 'The service date cannot be later than today.'],
    'descripcion' => ['es' => 'Describa lo sucedido con un poco más de detalle (al menos 20 caracteres).', 'en' => 'Please describe what happened in a little more detail (at least 20 characters).'],
    'largo' => ['es' => 'La descripción supera los 4.000 caracteres.', 'en' => 'The description exceeds 4,000 characters.'],
    'soportes' => ['es' => 'Adjunte como máximo 4 archivos PDF, de imagen, Word o Excel, de hasta 2,5 MB en total.', 'en' => 'Attach no more than 4 PDF, image, Word or Excel files, up to 2.5 MB in total.'],
    'nombre' => ['es' => 'Escriba su nombre completo.', 'en' => 'Please enter your full name.'],
    'documento' => ['es' => 'Escriba su NIT o número de cédula, solo con números, puntos o guiones.', 'en' => 'Please enter your tax ID or ID number, using only numbers, dots or hyphens.'],
    'correo' => ['es' => 'Escriba un correo con el formato nombre@empresa.com.', 'en' => 'Please enter an email address in the format name@company.com.'],
    'telefono' => ['es' => 'Escriba un teléfono de 7 a 15 dígitos; puede usar espacios o el signo +.', 'en' => 'Please enter a phone number of 7 to 15 digits; you may use spaces or the + sign.'],
    'municipio' => ['es' => 'Escriba el municipio o la ciudad.', 'en' => 'Please enter your city or municipality.'],
    'datos' => ['es' => 'Necesitamos su autorización para tramitar la solicitud.', 'en' => 'We need your authorization to process your request.'],
];

$body = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($body)) $body = [];

$text = fn ($v, int $max) => mb_substr(is_scalar($v) ? (string) $v : '', 0, $max);

$request = [
    'tipo' => $text($body['tipo'] ?? '', 20),
    'tipoOtro' => $text($body['tipoOtro'] ?? '', 120),
    'fuente' => $text($body['fuente'] ?? '', 20),
    'fechaServicio' => $text($body['fechaServicio'] ?? '', 10),
    'personaServicio' => $text($body['personaServicio'] ?? '', 200),
    'descripcion' => $text($body['descripcion'] ?? '', 4001),
    'soportes' => [],
    'nombre' => $text($body['nombre'] ?? '', 200),
    'empresa' => $text($body['empresa'] ?? '', 200),
    'documento' => $text($body['documento'] ?? '', 30),
    'correo' => $text($body['correo'] ?? '', 200),
    'telefono' => $text($body['telefono'] ?? '', 40),
    'direccion' => $text($body['direccion'] ?? '', 200),
    'municipio' => $text($body['municipio'] ?? '', 120),
    'datos' => ($body['datos'] ?? null) === true,
    'idioma' => ($body['idioma'] ?? '') === 'en' ? 'en' : 'es',
    'web' => $text($body['web'] ?? '', 200),
];
if (is_array($body['soportes'] ?? null)) {
    foreach (array_slice($body['soportes'], 0, $files['max'] + 1) as $f) {
        if (!is_array($f)) $f = [];
        $request['soportes'][] = [
            'nombre' => $text($f['nombre'] ?? '', 200),
            'tipo' => $text($f['tipo'] ?? '', 120),
            'peso' => is_numeric($f['peso'] ?? null) ? +$f['peso'] : 0,
            'contenido' => $text($f['contenido'] ?? '', (int) ceil($files['totalBytes'] * 1.4)),
        ];
    }
}

// Bots fill the hidden field; accept silently and drop.
if ($request['web'] !== '') reply(200, ['ok' => true]);

// The declared size must match the content actually sent.
foreach ($request['soportes'] as &$f) {
    $c = $f['contenido'];
    $real = intdiv(strlen($c) * 3, 4) - (str_ends_with($c, '==') ? 2 : (str_ends_with($c, '=') ? 1 : 0));
    if (abs($real - $f['peso']) > 4) $f['peso'] = $real;
}
unset($f);

$r = $request;
$lang = $r['idioma'];
$m = fn (string $k) => $messages[$k][$lang];
$len = fn (string $s) => mb_strlen(trim($s));
$errors = [];
if (!isset($kinds[$r['tipo']])) $errors['tipo'] = $m('tipo');
if ($r['tipo'] === 'otro' && $len($r['tipoOtro']) < 3) $errors['tipoOtro'] = $m('tipoOtro');
if (!isset($sources[$r['fuente']])) $errors['fuente'] = $m('fuente');
if ($r['fechaServicio'] !== '' && (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $r['fechaServicio']) || $r['fechaServicio'] > gmdate('Y-m-d'))) $errors['fechaServicio'] = $m('fechaServicio');
if ($len($r['descripcion']) < 20) $errors['descripcion'] = $m('descripcion');
if (mb_strlen($r['descripcion']) > 4000) $errors['descripcion'] = $m('largo');
$total = array_sum(array_column($r['soportes'], 'peso'));
$badType = array_filter($r['soportes'], fn ($f) => !in_array($f['tipo'], $files['types'], true));
if (count($r['soportes']) > $files['max'] || $total > $files['totalBytes'] || $badType) $errors['soportes'] = $m('soportes');
if ($len($r['nombre']) < 3) $errors['nombre'] = $m('nombre');
$formal = in_array($r['tipo'], $formalKinds, true);
if (($formal || trim($r['documento']) !== '') && !preg_match('/^[\d.\-\s]{5,20}$/', trim($r['documento']))) $errors['documento'] = $m('documento');
if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u', trim($r['correo']))) $errors['correo'] = $m('correo');
$digits = strlen(preg_replace('/\D/', '', $r['telefono']));
if (($formal || trim($r['telefono']) !== '') && (!preg_match('/^[\d\s()+-]+$/', $r['telefono']) || $digits < 7 || $digits > 15)) $errors['telefono'] = $m('telefono');
if ($formal && $len($r['municipio']) < 2) $errors['municipio'] = $m('municipio');
if (!$r['datos']) $errors['datos'] = $m('datos');

if ($errors) fail(422, 'Datos incompletos', ['errors' => $errors]);

$configFile = dirname(__DIR__, 2) . '/pqrs.config.php';
$config = is_file($configFile) ? include $configFile : [];
$webhook = is_array($config) ? trim((string) ($config['webhook'] ?? '')) : '';
if ($webhook === '') fail(503, 'Envío no configurado');

unset($request['web']);
$payload = ['formulario' => 'pqrs'] + $request + [
    // The company reads the request in Spanish, whatever language the visitor used.
    'tipoTexto' => $r['tipo'] === 'otro' ? 'Otro: ' . $r['tipoOtro'] : $kinds[$r['tipo']],
    'fuenteTexto' => $sources[$r['fuente']],
    'recibido' => gmdate('Y-m-d\TH:i:s.v\Z'),
    'origen' => 'trainingcorporation.com.co/pqrs',
];

$ch = curl_init($webhook);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
]);
curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$failed = curl_errno($ch) !== 0 || $status < 200 || $status >= 300;
curl_close($ch);
if ($failed) fail(502, 'No se pudo entregar la solicitud');

reply(200, ['ok' => true]);
