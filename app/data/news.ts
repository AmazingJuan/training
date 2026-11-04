/**
 * News posts. Imported from the WordPress REST API of trainingcorporation.com.co
 * (wp-json/wp/v2/posts) on 2026-10-14. The content is the company's own; the
 * Spanish text was copy-edited for a formal register on 2026-11-02 (grammar,
 * punctuation, capitalisation) without changing any fact, and translated into
 * English. `legacySlug` is the old root-level URL, redirected with a 301 in nuxt.config.
 */

import type { Loc } from '../../shared/utils/i18n'

export interface NewsBlock {
  type: 'p' | 'li' | 'h'
  text: Loc
}

export interface NewsPost {
  slug: string
  legacySlug: string
  /** ISO date, as published. */
  date: string
  title: Loc
  image?: string
  imageAlt?: Loc
  blocks: NewsBlock[]
}

const p = (es: string, en: string): NewsBlock => ({ type: 'p', text: { es, en } })
const li = (es: string, en: string): NewsBlock => ({ type: 'li', text: { es, en } })

export const news: NewsPost[] = [
  {
    slug: 'participacion-en-el-programa-progresa-cornare',
    legacySlug: 'participacion-en-el-programa-progresa-cornare',
    date: '2025-01-09',
    title: { es: 'Participación en el programa Progresa de CORNARE', en: 'Participation in CORNARE’s Progresa program' },
    image: '/images/fotos/cornare-progresa.png',
    imageAlt: { es: 'Evento del programa Progresa de CORNARE', en: 'CORNARE Progresa program event' },
    blocks: [
      p(
        'Training Corporation S.A.S. realizó la evaluación de las empresas nominadas al programa de liderazgo ambiental regional para empresas sostenibles del oriente antioqueño, Programa Progresa, versión 2024. Este programa busca fomentar la autogestión y el autocontrol en los sectores productivos, con el propósito de impulsar un crecimiento verde que favorezca un desarrollo compatible con el clima en la región bajo la jurisdicción de CORNARE.',
        'Training Corporation S.A.S. assessed the companies nominated to the 2024 edition of Progresa, the regional environmental leadership program for sustainable companies in eastern Antioquia. The program seeks to promote self-management and self-regulation in productive sectors, in order to drive green growth that supports climate-compatible development in the region under the jurisdiction of CORNARE, the regional environmental authority.',
      ),
      p('La evaluación comprendió cuatro dimensiones:', 'The assessment covered four dimensions:'),
      li(
        'Dimensión ambiental: evalúa el cumplimiento de los acuerdos de crecimiento verde suscritos con CORNARE, en las líneas de desarrollo tecnológico e investigación aplicada; crecimiento verde; capacitación, difusión y comunicación, e incentivos. Permite evidenciar la reducción en el consumo de recursos naturales y en las emisiones de gases de efecto invernadero (GEI), mediante indicadores de agua, energía, manejo de residuos y GEI.',
        'Environmental dimension: assesses compliance with the green growth agreements signed with CORNARE, in the areas of technological development and applied research; green growth; training, outreach and communication; and incentives. It evidences reductions in natural resource consumption and greenhouse gas (GHG) emissions through water, energy, waste management and GHG indicators.',
      ),
      li(
        'Direccionamiento estratégico: evalúa que las organizaciones desarrollen, en sus procesos y actividades, estrategias que fortalezcan el componente ambiental desde el desarrollo sostenible.',
        'Strategic direction: assesses whether organizations develop, across their processes and activities, strategies that strengthen the environmental component from a sustainable development perspective.',
      ),
      li(
        'Dimensión social: evalúa que las empresas promuevan y mantengan la cohesión social y la capacidad de trabajar por objetivos comunes que buscan mitigar los impactos sociales negativos y potenciar los positivos.',
        'Social dimension: assesses whether companies promote and maintain social cohesion and the ability to work toward common goals that mitigate negative social impacts and enhance positive ones.',
      ),
      li(
        'Articulación con los PIGCCS: evalúa la integración de las organizaciones con los planes integrales de gestión del cambio climático sectoriales y territoriales, incluido el plan de crecimiento verde y desarrollo compatible con el clima para el oriente antioqueño, cuyo propósito es lograr soluciones duraderas y sostenibles mediante medidas de mitigación y adaptación al cambio climático.',
        'Alignment with the PIGCCs: assesses how organizations integrate with sectoral and territorial comprehensive climate change management plans, including the green growth and climate-compatible development plan for eastern Antioquia, which seeks lasting, sustainable solutions through climate change mitigation and adaptation measures.',
      ),
      p(
        'En la versión 2024 del programa, Training Corporation S.A.S. evaluó 43 empresas de la jurisdicción de CORNARE.',
        'For the 2024 edition of the program, Training Corporation S.A.S. assessed 43 companies within CORNARE’s jurisdiction.',
      ),
      p(
        'Como resultado, Training Corporation S.A.S. emitió un dictamen de cumplimiento por categorías: Hacia el liderazgo, Líder Progresa, Gran Líder Progresa Bronce, Gran Líder Progresa Plata y Gran Líder Progresa Oro.',
        'As a result, Training Corporation S.A.S. issued a compliance rating by category: Toward Leadership, Progresa Leader, and Great Progresa Leader at the Bronze, Silver and Gold levels.',
      ),
      p(
        'CORNARE reconoció a las empresas en un evento de premiación celebrado el viernes 29 de noviembre de 2024, con la participación de las empresas evaluadas.',
        'CORNARE recognized the companies at an awards ceremony held on Friday, November 29, 2024, attended by the companies assessed.',
      ),
    ],
  },
  {
    slug: 'camino-hacia-la-sostenibilidad',
    legacySlug: 'camino-hacia-la-sostenibilidad',
    date: '2025-01-08',
    title: { es: 'Camino hacia la sostenibilidad', en: 'Our path toward sustainability' },
    blocks: [
      p(
        'Como parte de su plataforma estratégica 2024-2030, Training Corporation S.A.S. busca fortalecer el posicionamiento de su marca por medio de la línea de sostenibilidad, orientada a alcanzar la neutralidad de carbono. Entre sus estrategias se destacan:',
        'As part of its 2024–2030 strategic framework, Training Corporation S.A.S. seeks to strengthen its brand positioning through its sustainability line, aimed at achieving carbon neutrality. Its strategies include:',
      ),
      li(
        'El cálculo de la huella de carbono corporativa, para definir estrategias de reducción y compensación de las emisiones de nuestras actividades, con el objetivo de alcanzar y certificar la neutralidad de carbono.',
        'Calculating the corporate carbon footprint, in order to define strategies to reduce and offset the emissions from our activities, with the goal of achieving and certifying carbon neutrality.',
      ),
      li(
        'El fortalecimiento de las competencias del personal interno y de los contratistas en materia de sostenibilidad.',
        'Strengthening the sustainability competencies of in-house staff and contractors.',
      ),
      p(
        'En 2024 dimos los primeros pasos con la certificación de auditores internos en el sistema de gestión basura cero, y en 2025 se retomará el proyecto de huella de carbono.',
        'In 2024 we took our first steps with the certification of internal auditors in the zero waste management system, and in 2025 the carbon footprint project will resume.',
      ),
      p(
        'Invitamos a nuestros socios, clientes, contratistas, personal de planta y proveedores a fortalecer sus conocimientos en sostenibilidad mediante la participación en nuestros programas de formación y en el desarrollo de estrategias orientadas a la protección y gestión del medio ambiente.',
        'We invite our partners, clients, contractors, staff and suppliers to strengthen their knowledge of sustainability by taking part in our training programs and in developing strategies for environmental protection and management.',
      ),
    ],
  },
  {
    slug: 'nueva-sede-administrativa',
    legacySlug: 'nueva-sede-administrativa',
    date: '2024-04-18',
    title: { es: 'Nueva sede administrativa', en: 'New administrative offices' },
    image: '/images/fotos/edificio-colmena.jpg',
    imageAlt: { es: 'Edificio Colmena, sede administrativa en Medellín', en: 'Edificio Colmena, administrative offices in Medellín' },
    blocks: [
      p(
        'Nuestro crecimiento continúa con el traslado de la sede administrativa al edificio Colmena, carrera 43A n.º 1A Sur-29, oficina 315, avenida El Poblado, Medellín, lo que nos permite ofrecer mejores condiciones de atención a nuestros grupos de interés.',
        'Our growth continues with the relocation of our administrative offices to the Colmena building, Carrera 43A No. 1A Sur-29, Office 315, Avenida El Poblado, Medellín, which allows us to offer better facilities to our stakeholders.',
      ),
      p(
        'Le invitamos a visitarnos en nuestra nueva sede para continuar construyendo relaciones exitosas.',
        'We invite you to visit our new offices as we continue to build successful relationships.',
      ),
    ],
  },
  {
    slug: 'asi-vamos-en-nuestro-proposito-de-internacionalizacion',
    legacySlug: 'asi-vamos-en-nuestro-proposito-de-internacionalizacion',
    date: '2022-11-24',
    title: { es: 'Avances en nuestro propósito de internacionalización', en: 'Progress on our internationalization goal' },
    blocks: [
      p(
        'El ingeniero John Fredy Moreno Velásquez, entonces gerente de Training Corporation S.A.S., respondió a la pregunta: ¿qué significa el propósito de internacionalización de los servicios y cuáles son los avances alcanzados?',
        'Engineer John Fredy Moreno Velásquez, then General Manager of Training Corporation S.A.S., answered the question: what does the goal of internationalizing our services mean, and what progress has been made?',
      ),
      p(
        '«Al identificar en los análisis estratégicos la capacidad en conocimiento y experiencia que hemos desarrollado a lo largo de dieciocho años de existencia, fruto de servicios prestados con profesionalismo y altos estándares de calidad, nos comprometimos a consolidar nuestra presencia nacional e internacional hacia 2025.',
        '“When our strategic analyses identified the knowledge and experience we have built over eighteen years, the result of services delivered with professionalism and high quality standards, we committed to consolidating our national and international presence by 2025.',
      ),
      p(
        'A mediados de 2022 avanzamos de forma positiva en este reto con dos logros en servicios de formación: el primero, para el grupo empresarial ISA, con eventos de formación para sus empresas en Colombia, Brasil y Perú; el segundo, en Costa Rica, por medio de nuestro aliado AGIO Gestoría de Negocios S.A., con la asistencia de empresas del sector energético como el ICE.',
        'By mid-2022 we had made solid progress on this challenge with two achievements in training services: first, for the ISA business group, with training events for its companies in Colombia, Brazil and Peru; second, in Costa Rica, through our partner AGIO Gestoría de Negocios S.A., attended by energy sector companies such as ICE.',
      ),
      p(
        'Nos complace la acogida que han tenido nuestros eventos de formación virtual en el ámbito internacional, resultado de:',
        'We are pleased with the reception of our online training events internationally, the result of:',
      ),
      li(
        'La participación del equipo de InnTraining, responsable de aplicar estándares de innovación en el diseño curricular y la pedagogía.',
        'The work of the InnTraining team, responsible for applying innovation standards to curriculum design and teaching.',
      ),
      li(
        'La NTC 5802, Gestión de la investigación, desarrollo e innovación (I+D+i). Requisitos de un proyecto de I+D+i.',
        'NTC 5802, Management of research, development and innovation (R&D&I). Requirements for an R&D&I project.',
      ),
      li(
        'La NTC 5801:2018, Sistema de gestión de la innovación. Requisitos.',
        'NTC 5801:2018, Innovation management system. Requirements.',
      ),
      li(
        'La planificación de los recursos logísticos, en la que el uso de plataformas virtuales apoya la pedagogía y propicia una participación más dinámica de los asistentes.',
        'Logistics planning, in which online platforms support teaching and encourage more active participation by attendees.',
      ),
      li(
        'El uso de controles de planificación de tiempos, contenidos y talleres, que permiten un alto grado de precisión en el cumplimiento de las agendas.',
        'Planning controls for time, content and workshops, which allow agendas to be met with a high degree of precision.',
      ),
      li(
        'La participación de instructores expertos, con vocación y conocimiento, que hacen memorables los eventos de formación.»',
        'Expert instructors, with both vocation and knowledge, who make training events memorable.”',
      ),
    ],
  },
  {
    slug: 'la-empresa-de-energia-de-boyaca-ebsa-s-a-e-s-p',
    legacySlug: 'la-empresa-de-energia-de-boyaca-ebsa-s-a-e-s-p',
    date: '2022-10-23',
    title: { es: 'Primera auditoría interna ISO 55001 de la Empresa de Energía de Boyacá', en: 'First ISO 55001 internal audit for Empresa de Energía de Boyacá' },
    image: '/images/fotos/ebsa.jpg',
    imageAlt: { es: 'Sede de la Empresa de Energía de Boyacá EBSA', en: 'Headquarters of Empresa de Energía de Boyacá (EBSA)' },
    blocks: [
      p(
        'Los sistemas de gestión de activos son un requisito regulatorio para las empresas operadoras de energía en Colombia. Esto ha exigido que, como prestadores de servicios de auditoría, dispongamos en Training Corporation de toda la capacidad humana y técnica para ofrecer a nuestros clientes un servicio de calidad. Así, acompañamos a la Empresa de Energía de Boyacá, EBSA S.A. E.S.P., en su primera auditoría interna al sistema de gestión de activos según la norma ISO 55001:2015. El ejercicio se desarrolló durante dos semanas continuas, con la participación de cuatro profesionales, en modalidad híbrida (virtual y presencial).',
        'Asset management systems are a regulatory requirement for electricity companies in Colombia. As an audit service provider, this has required Training Corporation to have the full human and technical capacity to offer our clients a quality service. Accordingly, we supported Empresa de Energía de Boyacá, EBSA S.A. E.S.P., in its first internal audit of its asset management system under ISO 55001:2015. The audit took place over two consecutive weeks, with four professionals, in a hybrid format (online and on site).',
      ),
      p(
        'Con la participación de los procesos financieros en la auditoría, se constató la rentabilización alcanzada con la gestión de activos, tanto en los procesos habilitadores como en los que intervienen en el ciclo de vida de los activos, así como la adecuación, conveniencia y eficacia del sistema de gestión de activos.',
        'With the participation of the financial processes in the audit, it was possible to verify the value delivered by asset management, both in the enabling processes and in those involved in the asset life cycle, as well as the suitability, adequacy and effectiveness of the asset management system.',
      ),
      p(
        'Con los resultados de la auditoría, EBSA S.A. E.S.P. dispone de nueva información para revisar el rol del sistema de gestión de activos y la hoja de ruta para la mejora sistemática y el fortalecimiento de la cultura empresarial orientada a la rentabilización de los activos.',
        'With the audit results, EBSA S.A. E.S.P. has new information to review the role of the asset management system and its roadmap for systematic improvement and for strengthening a corporate culture focused on asset value.',
      ),
    ],
  },
  {
    slug: 'isa-intercolombia',
    legacySlug: 'isa_noticia',
    date: '2022-10-23',
    title: {
      es: 'Un nuevo modelo de programación de auditorías para ISA Intercolombia (hoy ISA Energía)',
      en: 'A new audit scheduling model for ISA Intercolombia (now ISA Energía)',
    },
    image: '/images/fotos/isa-torre-transmision.jpg',
    imageAlt: { es: 'Torre de transmisión eléctrica', en: 'Electricity transmission tower' },
    blocks: [
      p(
        'Las dinámicas empresariales de nuestros clientes, que cambian y avanzan con rapidez, nos exigen ser propositivos y generar mayor valor en las auditorías internas integrales. Por ello, hemos estudiado e incorporado nuevos criterios para el diseño de programas y planes de auditoría que favorecen la eficiencia en el uso de los recursos. Junto con los nuevos modelos de programación y planificación, hemos diseñado metodologías que propician resultados de mayor valor y relevancia para el cliente.',
        'Our clients’ business environments change and evolve quickly, which requires us to be proactive and to add greater value in integrated internal audits. We have therefore studied and adopted new criteria for designing audit programs and plans that make efficient use of resources. Alongside the new scheduling and planning models, we have designed methodologies that deliver results of greater value and relevance to the client.',
      ),
      p(
        'Con ISA Intercolombia, hoy ISA Energía, se estructuró un programa de auditorías que cubre el ciclo de certificación de cinco modelos de gestión: calidad, ambiente, seguridad y salud en el trabajo, seguridad de la información y gestión de activos.',
        'With ISA Intercolombia, now ISA Energía, we structured an audit program covering the certification cycle of five management models: quality, environment, occupational health and safety, information security and asset management.',
      ),
      p(
        'Este modelo ha permitido abordar de forma más eficiente, adecuada y profunda los requisitos de los modelos de gestión, del cliente y de la regulación, así como los procesos, sedes, proyectos y activos, con un enfoque de ciclo de vida, superando el esquema habitual de ciclos de auditoría programados a un año. Sus principales beneficios son:',
        'This model has made it possible to address the requirements of the management models, the client and the regulations, as well as processes, sites, projects and assets, more efficiently, appropriately and in greater depth, with a life-cycle approach that goes beyond the usual one-year audit cycle. Its main benefits are:',
      ),
      li('Optimizar la asignación de los recursos.', 'Optimizing the allocation of resources.'),
      li(
        'Flexibilizar las agendas de auditoría, de modo que los procesos reciban las auditorías de forma natural y sincronizada con sus tiempos de gestión.',
        'Making audit agendas more flexible, so that processes receive audits naturally and in step with their own management cycles.',
      ),
      li(
        'Realizar evaluaciones en el tiempo que favorecen el análisis de la integralidad y la alineación entre los modelos de gestión.',
        'Conducting assessments over time that support the analysis of integration and alignment across management models.',
      ),
      li(
        'Consolidar las evidencias de manera rigurosa para estructurar hallazgos sólidos y de relevancia transversal, de modo que las acciones de mejora repercutan en todo el sistema de gestión y optimicen los esfuerzos.',
        'Consolidating evidence rigorously to build solid findings of cross-cutting relevance, so that improvement actions benefit the entire management system and make the best use of effort.',
      ),
      p(
        'En cuatro años de acompañamiento hemos realizado las auditorías internas integrales a las normas NTC-ISO 9001, 14001, 45001, 55001 y 27001, con alcance a todos los centros de transmisión de energía (Noroccidente, Suroccidente, Centro y Oriente) y a los proyectos en sus diferentes fases, en modalidad presencial y virtual.',
        'Over four years of support, we have conducted integrated internal audits under NTC-ISO 9001, 14001, 45001, 55001 and 27001, covering all of the energy transmission centers (Northwest, Southwest, Center and East) and projects at their various stages, both on site and online.',
      ),
      p(
        'Durante 2022, Training Corporation diseñó un nuevo esquema de auditoría al sistema de gestión de activos que supera el paradigma de auditar únicamente por procesos: incorpora, además de los procesos, otros ejes de evaluación, como los activos críticos, su rentabilización y la alineación estratégica, táctica y operativa de la gestión de activos.',
        'In 2022, Training Corporation designed a new approach to auditing the asset management system that goes beyond auditing by process alone: in addition to processes, it incorporates other lines of inquiry, such as critical assets, the value they deliver, and the strategic, tactical and operational alignment of asset management.',
      ),
    ],
  },
  {
    slug: 'certificado-de-nuestro-sistema-de-gestion-seguridad-y-salud-en-el-trabajo',
    legacySlug: 'certificado-de-nuestro-sistema-de-gestion-seguridad-y-salud-en-el-trabajo',
    date: '2022-06-18',
    title: { es: 'Certificación de nuestro sistema de gestión de seguridad y salud en el trabajo', en: 'Certification of our occupational health and safety management system' },
    blocks: [
      p(
        'Training Corporation S.A.S. se complace en compartir la certificación de su sistema de gestión de seguridad y salud en el trabajo, otorgada por Bureau Veritas conforme a la norma NTC-ISO 45001:2018. Este logro forma parte de nuestro compromiso con la mejora de la calidad de vida de nuestros grupos de interés.',
        'Training Corporation S.A.S. is pleased to announce the certification of its occupational health and safety management system, granted by Bureau Veritas under NTC-ISO 45001:2018. This achievement is part of our commitment to improving the quality of life of our stakeholders.',
      ),
      p(
        'Invitamos a todos nuestros grupos de interés a participar en la mejora continua de nuestra gestión de la seguridad y salud en el trabajo, mediante estrategias para la prevención y mitigación de accidentes de trabajo y enfermedades laborales, y la provisión de espacios de trabajo sanos y seguros.',
        'We invite all our stakeholders to take part in the continual improvement of our occupational health and safety management, through strategies to prevent and mitigate occupational accidents and diseases and to provide healthy and safe workplaces.',
      ),
    ],
  },
  {
    slug: 'ampliacion-del-alcance-del-sistema-de-gestion-de-calidad',
    legacySlug: 'ampliacion-del-alcance-del-sistema-de-gestion-de-calidad',
    date: '2022-06-18',
    title: { es: 'Ampliación del alcance del sistema de gestión de la calidad', en: 'Extended scope of our quality management system' },
    blocks: [
      p(
        'Nuestro equipo obtuvo la ampliación del alcance del certificado del sistema de gestión de la calidad de la empresa con los siguientes servicios:',
        'Our team secured an extension to the scope of the company’s quality management system certificate to include the following services:',
      ),
      li(
        'Modelo Integrado de Planeación y Gestión (MIPG), en las unidades estratégicas de negocio Consultoría y Nuevos Negocios y Gestión del Conocimiento.',
        'The Integrated Planning and Management Model (MIPG), in the Consulting and New Business and the Knowledge Management strategic business units.',
      ),
      li(
        'Modelo Integrado de Planeación y Gestión (MIPG), regulación del sector eléctrico y proyectos constructivos del sector eléctrico, en la unidad estratégica de negocio Evaluación Organizacional.',
        'The Integrated Planning and Management Model (MIPG), electricity sector regulation and electricity sector construction projects, in the Organizational Assessment strategic business unit.',
      ),
    ],
  },
  {
    slug: 'reconocimiento-camara-de-comercio-de-bogota',
    legacySlug: 'reconocimeinto-camara-de-comercio-de-bogota',
    date: '2020-11-23',
    title: { es: 'Reconocimiento de la Cámara de Comercio de Bogotá', en: 'Recognition from the Bogotá Chamber of Commerce' },
    image: '/images/fotos/reconocimiento-ccb.png',
    imageAlt: { es: 'Reconocimiento de la Cámara de Comercio de Bogotá a Training Corporation', en: 'Bogotá Chamber of Commerce recognition awarded to Training Corporation' },
    blocks: [
      p(
        'En la XI Jornada de Gestión Integral de Proveedores, la Cámara de Comercio de Bogotá reconoció a Training Corporation por obtener una calificación de 100/100 en la evaluación de los bienes y servicios suministrados a la entidad entre julio de 2019 y julio de 2020.',
        'At its 11th Comprehensive Supplier Management Day, the Bogotá Chamber of Commerce recognized Training Corporation for achieving a score of 100/100 in the evaluation of the goods and services supplied to the organization between July 2019 and July 2020.',
      ),
    ],
  },
  {
    slug: 'integracion-sistemas-de-gestion-alcaldia-de-girardota',
    legacySlug: 'nicia-integracion-de-los-sistemas-de-gestion-de-la-alcaldia-de-girardota',
    date: '2020-11-13',
    title: { es: 'Integración de los sistemas de gestión de la Alcaldía de Girardota', en: 'Integrating the management systems of the Municipality of Girardota' },
    blocks: [
      p(
        'Entre febrero y agosto de 2020, Training Corporation Ltda. prestó servicios de consultoría y asesoría a la Alcaldía de Girardota para actualizar y unificar el sistema de gestión de la calidad NTC-ISO 9001:2015 y el Modelo Integrado de Planeación y Gestión (MIPG), e implementar el sistema de control interno (SCI), con base en el Decreto Único Reglamentario del Sector Función Pública 1499 de 2017. El propósito fue contribuir a los resultados del Programa de Gobierno 2020-2023 del municipio y atender las necesidades de la ciudadanía con integridad y calidad en el servicio.',
        'Between February and August 2020, Training Corporation Ltda. provided consulting and advisory services to the Municipality of Girardota to update and unify its NTC-ISO 9001:2015 quality management system and its Integrated Planning and Management Model (MIPG), and to implement its internal control system, in accordance with Single Regulatory Decree 1499 of 2017 for the Public Administration Sector. The aim was to contribute to the results of the municipality’s 2020–2023 Government Program and to meet citizens’ needs with integrity and quality of service.',
      ),
      p(
        'El equipo de trabajo estuvo conformado por ocho profesionales comprometidos con el fortalecimiento de las capacidades del municipio y con el cumplimiento de los objetivos del proyecto.',
        'The team consisted of eight professionals committed to strengthening the municipality’s capabilities and to achieving the project’s objectives.',
      ),
    ],
  },
  {
    slug: 'con-exito-lanzamos-nuestro-cursos-de-gestion-de-activos',
    legacySlug: 'con-exito-lanzamos-nuestro-cursos-de-gestion-de-activos',
    date: '2020-11-13',
    title: { es: 'Lanzamiento de nuestros cursos de gestión de activos', en: 'Launch of our asset management courses' },
    image: '/images/fotos/curso-auditores-iso-55001-2020.jpg',
    imageAlt: {
      es: 'Participantes del curso de fundamentos y calificación de auditores en ISO 55001, Medellín, 2020',
      en: 'Participants in the ISO 55001 foundations and auditor qualification course, Medellín, 2020',
    },
    blocks: [
      p(
        'Fotografía: curso de fundamentos y calificación de auditores internos en la norma NTC-ISO 55001:2015, Gestión de activos. Sistemas de gestión. Requisitos, y en la guía GTC-ISO 19011:2018, Directrices para la auditoría de los sistemas de gestión.',
        'Photo: foundations and internal auditor qualification course on NTC-ISO 55001:2015, Asset management. Management systems. Requirements, and on GTC-ISO 19011:2018, Guidelines for auditing management systems.',
      ),
      p(
        'En febrero de 2020 se realizaron en Medellín los dos primeros cursos de gestión de activos, sobre fundamentos y calificación de auditores. Asistieron profesionales de seguridad de la información, gestión ambiental, seguridad y salud en el trabajo, ingeniería eléctrica, ingeniería industrial y administración, interesados en incorporar la gestión de activos a su conocimiento para transferirlo a sus organizaciones en ciudades como Medellín, Armenia y Bucaramanga.',
        'In February 2020, the first two asset management courses, on foundations and auditor qualification, were held in Medellín. They were attended by professionals in information security, environmental management, occupational health and safety, electrical engineering, industrial engineering and business administration, who sought to add asset management to their expertise and bring it back to their organizations in cities such as Medellín, Armenia and Bucaramanga.',
      ),
      p(
        'La metodología pedagógica de aprendizaje desde la práctica permitió profundizar en aspectos fundamentales para la comprensión de las normas:',
        'The learning-by-doing teaching methodology made it possible to explore key aspects of the following standards in depth:',
      ),
      li('NTC-ISO 55000:2014, Gestión de activos. Aspectos generales, principios y terminología.', 'NTC-ISO 55000:2014, Asset management. Overview, principles and terminology.'),
      li('NTC-ISO 55001:2015, Gestión de activos. Sistemas de gestión. Requisitos.', 'NTC-ISO 55001:2015, Asset management. Management systems. Requirements.'),
      li('NTC-ISO 55002:2015, Gestión de activos. Sistemas de gestión. Directrices para la aplicación de la ISO 55001.', 'NTC-ISO 55002:2015, Asset management. Management systems. Guidelines for the application of ISO 55001.'),
      li('GTC-ISO 19011:2018, Directrices para la auditoría de los sistemas de gestión.', 'GTC-ISO 19011:2018, Guidelines for auditing management systems.'),
    ],
  },
  {
    slug: 'training-corporation-ltda-cada-vez-mas-cerca-de-sus-empresas-clientes',
    legacySlug: 'training-corporation-ltda-cada-vez-mas-cerca-de-sus-empresas-clientes',
    date: '2020-11-13',
    title: { es: 'Consultoría virtual: más cerca de nuestras organizaciones clientes', en: 'Remote consulting: closer to our client organizations' },
    blocks: [
      p(
        'Con el propósito de satisfacer las necesidades y expectativas de sus organizaciones clientes, Training Corporation Ltda. desarrolló el servicio de consultoría virtual, que optimiza los tiempos de atención, flexibiliza las agendas de trabajo y reduce los costos del servicio al eliminar los tiempos y costos de desplazamiento de los consultores.',
        'To meet the needs and expectations of its client organizations, Training Corporation Ltda. developed a remote consulting service that shortens response times, makes work schedules more flexible and reduces service costs by eliminating consultants’ travel time and expenses.',
      ),
      p(
        'La Empresa de Energía de Boyacá, EBSA S.A. E.S.P., ha recibido mediante esta modalidad servicios de acompañamiento en la gestión de acuerdos de niveles de servicio (ANS), el fortalecimiento de la gestión de interventoría y la evaluación y reevaluación de contratistas, servicios que incluyen la referenciación de buenas prácticas identificadas en el sector eléctrico colombiano.',
        'Through this format, Empresa de Energía de Boyacá, EBSA S.A. E.S.P., has received support in managing service level agreements (SLAs), strengthening its technical supervision of contracts, and evaluating and re-evaluating contractors, including benchmarking against good practices identified in the Colombian electricity sector.',
      ),
      p(
        'De este modo, EBSA S.A. E.S.P. tiene acceso a consultores ubicados en distintas ciudades del país, sin las limitaciones de la distancia ni los costos de desplazamiento.',
        'As a result, EBSA S.A. E.S.P. has access to consultants based in different cities across the country, without the constraints of distance or travel costs.',
      ),
    ],
  },
]

export const findPost = (slug: string) => news.find((n) => n.slug === slug)

/** Pixel size of each news photo, so the page reserves its space before it loads. */
export const newsImageSizes: Record<string, [number, number]> = {
  '/images/fotos/cornare-progresa.png': [1107, 690],
  '/images/fotos/edificio-colmena.jpg': [621, 828],
  '/images/fotos/ebsa.jpg': [1152, 768],
  '/images/fotos/isa-torre-transmision.jpg': [390, 693],
  '/images/fotos/reconocimiento-ccb.png': [1391, 1065],
  '/images/fotos/curso-auditores-iso-55001-2020.jpg': [1333, 819],
}
