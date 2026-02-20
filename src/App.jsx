import { useEffect, useMemo, useState } from 'react'
import './App.css'

function GanttRow({ name, start, end, length, offset, detail, tone = 'tone-1' }) {
  return (
    <div className="gantt-row">
      <div className="gantt-name">
        <strong>{name}</strong>
        <span>{detail}</span>
      </div>
      <div className="gantt-track">
        <div
          className={`gantt-bar ${tone}`}
          style={{
            marginLeft: `${offset}%`,
            width: `${length}%`,
          }}
        >
          {end ? `${start} - ${end}` : start}
        </div>
      </div>
    </div>
  )
}

function PlanStageColumn({ stage }) {
  return (
    <article className={`plan-stage theme-${stage.theme}`}>
      <header className="plan-stage-header">
        <span>{stage.title}</span>
        <h4>{stage.subtitle}</h4>
      </header>

      <div className="plan-stage-activities">
        <p className="plan-section-title">Actividades</p>
        {stage.activities.map((act) => (
          <div className="plan-activity" key={`${stage.id}-${act.title}`}>
            <p>{act.title}</p>
            <ul>
              {act.items.map((item) => (
                <li key={`${act.title}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="plan-stage-products">
        <p className="plan-section-title">Productos</p>
        <ul>
          {stage.products.map((product) => (
            <li key={`${stage.id}-${product}`}>{product}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function App() {
  const presentationPassword = (import.meta.env.VITE_PASSWORD_PRESENTATION ?? '').toString()
  const agendaItems = useMemo(
    () => [
      { name: 'Presentacion y acuerdos', mins: 10, tone: 'agenda-c1' },
      { name: 'Estructura organizativa', mins: 15, tone: 'agenda-c2' },
      { name: 'Productos esperados', mins: 10, tone: 'agenda-c3' },
      { name: 'Cronograma y metodologia', mins: 30, tone: 'agenda-c4' },
      { name: 'Requerimientos etapas 1 y 2', mins: 15, tone: 'agenda-c5' },
      { name: 'Proximos pasos', mins: 10, tone: 'agenda-c6' },
    ],
    [],
  )

  const planData = useMemo(
    () => [
      {
        id: 1,
        title: 'ETAPA 1',
        subtitle: 'Enfoque metodologico y plan de trabajo',
        activities: [
          {
            title: 'Actividad 1: Revision y validacion',
            items: [
              'Identificacion de fuentes',
              'Misiones en terreno',
              'Comprobacion de uso',
              'Analisis de datos',
              'Revision de equipos',
              'Ajustes y validacion',
            ],
          },
        ],
        products: [
          'Informes de inicio',
          'Metodologias (fichas/formularios)',
          'Estructuras de Metadatos (BDGs)',
          'Cronograma definitivo',
          'Plan de capacitacion',
        ],
        theme: 'blue',
      },
      {
        id: 2,
        title: 'ETAPA 2',
        subtitle: 'Movilizacion logistica y soluciones IT',
        activities: [
          {
            title: 'Actividad 2: Logistica',
            items: ['Adquirir equipamientos', 'Habilitar espacios', 'Organizar personal'],
          },
          {
            title: 'Actividad 3: Informatica',
            items: [
              'Crear SIG modular',
              'Crear BDGs',
              'Geocodificacion',
              'Actualizar cartografia',
              'Aplicacion de captura',
            ],
          },
        ],
        products: [
          'Movilizacion de equipos',
          'Instalacion de hardware',
          'Servidor y mantenimiento',
        ],
        theme: 'indigo',
      },
      {
        id: 3,
        title: 'ETAPA 3',
        subtitle: 'Levantamientos y capacitacion tecnica',
        activities: [
          {
            title: 'Actividad 4: Redes',
            items: ['Alcance', 'Digitalizacion', 'Cateos', 'Hidraulica'],
          },
          {
            title: 'Actividad 5: Usuarios',
            items: ['Planeacion', 'Captura terreno'],
          },
          {
            title: 'Actividad 6: Transferencia',
            items: ['Catastro usuarios - SIG', 'Catastro redes - SIG'],
          },
        ],
        products: [
          'Catastro Redes: BDG e Hidraulica',
          'Catastro Usuarios: Gestion y apps',
          'Transferencia: Manuales y evaluacion',
        ],
        theme: 'purple',
      },
      {
        id: 4,
        title: 'ETAPA 4',
        subtitle: 'Finalizacion y entrega de resultados',
        activities: [
          {
            title: 'Actividad 7: Entrega final',
            items: ['Informe final consolidado', 'Taller de cierre'],
          },
        ],
        products: ['Informe final', 'Acciones futuras', 'Material de taller', 'Proyectos SIG'],
        theme: 'emerald',
      },
    ],
    [],
  )

  const slides = useMemo(
    () => [
      {
        id: 'portada',
        title: 'Cronograma Operativo',
        subtitle: 'Etapas 1 y 2 | SBCC-003-2024/INAPA-AFD-UE',
        content: (
          <section className="cover-slide">
            <div className="cover-hero">
              <h2>
                Propuesta de agenda <br /> Reunion 1
              </h2>
              <p>
                Definir aspectos operativos, validar cronograma de las etapas 1 y 2, comenzar el
                intercambio.
              </p>
            </div>
            <div className="cover-meta">
              <div className="info-card">
                <span className="label">Proyecto</span>
                <strong>SBCC-003-2024 / INAPA-AFD-UE</strong>
              </div>
              <div className="info-card">
                <span className="label">Reunion</span>
                <strong>Viernes 20 de febrero de 2026</strong>
              </div>
              <div className="info-card">
                <span className="label">Conduccion</span>
                <strong>Comite Tecnico del Proyecto (CTP) y Consultores</strong>
              </div>
            </div>
          </section>
        ),
      },
      {
        id: 'agenda',
        title: 'Agenda De La Reunion',
        subtitle: 'Distribucion visual de 90 minutos',
        content: (
          <div className="agenda-graph">
            {agendaItems.map(({ name, mins, tone }, index) => {
              const priorMinutes = agendaItems
                .slice(0, index)
                .reduce((total, item) => total + item.mins, 0)

              const left = (priorMinutes / 90) * 100
              const width = (mins / 90) * 100

              return (
                <div className="agenda-bar" key={name}>
                  <div className="agenda-label">
                    <strong>{name}</strong>
                    <span>{mins} min</span>
                  </div>
                  <div className="agenda-track agenda-track-clean">
                    <div
                      className={`agenda-fill ${tone} agenda-fill-sequential`}
                      style={{ marginLeft: `${left}%`, width: `${width}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ),
      },
      {
        id: 'macro',
        title: 'Plan De Trabajo',
        subtitle: 'Vista general por etapas, actividades y productos',
        content: (
          <section className="plan-board">
            <header className="plan-board-top">
              <div>
                <h3>PLAN DE TRABAJO</h3>
                <p>Metodologia de Catastro e Informacion Geografica</p>
              </div>
              <span>Vista General del Proyecto</span>
            </header>

            <div className="plan-stage-grid">
              {planData.map((stage) => (
                <PlanStageColumn key={stage.id} stage={stage} />
              ))}
            </div>
          </section>
        ),
      },
      {
        id: 'macro-cronograma',
        title: 'Grafico Macro Del Cronograma',
        subtitle: 'Comparativo de ventanas de ejecucion',
        content: (
          <section className="macro-layout">
            <div className="macro-chart">
              <div className="month-scale">
                {['Feb', 'Mar', 'Abr'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="gantt">
                <GanttRow
                  name="Etapa 1"
                  start="16 Febrero"
                  end="14 Abril"
                  detail="Diagnostico + validacion + informe inicial"
                  offset={3}
                  length={72}
                  tone="tone-1"
                />
                <GanttRow
                  name="Etapa 2"
                  start="9 Marzo"
                  end="16 Abril"
                  detail="Habilitacion operativa + SIG + app captura"
                  offset={35}
                  length={49}
                  tone="tone-2"
                />
              </div>
            </div>

            <aside className="macro-aside">
              <article>
                <span>Duracion Etapa 1</span>
                <strong>58 dias</strong>
                <p>Validacion metodologica, diagnostico tecnico y entrega inicial.</p>
              </article>
              <article>
                <span>Duracion Etapa 2</span>
                <strong>39 dias</strong>
                <p>Movilizacion, infraestructura SIG y habilitacion de captura.</p>
              </article>
              <article>
                <span>Solape Operativo</span>
                <strong>9 Mar - 14 Abr</strong>
                <p>Ventana para acelerar actividades sin detener el frente tecnico.</p>
              </article>
            </aside>
          </section>
        ),
      },
      {
        id: 'productos',
        title: 'Matriz Visual De Productos',
        subtitle: 'Productos esperados y entregables',
        content: (
          <section className="product-layout">
            <div className="product-matrix">
              <div className="product-col">
                <span className="product-tag">Etapa Operativa</span>
                <h4>Etapa 1</h4>
                <ul>
                  <li>Enfoque metodologico y plan de trabajo detallado</li>
                  <li>Informe de inicio y metodologia actualizada para Catastro de usuarios y redes</li>
                  <li>Fichas tecnicas, nota tecnica y metadatos/estructura de BD</li>
                  <li>Plan de capacitacion para catastro de redes y usuarios</li>
                  <li>Cronograma y plan de capacitacion para catastro de usuarios</li>
                </ul>
              </div>
              <div className="product-col">
                <span className="product-tag">Etapa Operativa</span>
                <h4>Etapa 2</h4>
                <ul>
                  <li>Movilizacion logistica y adquisicion de equipo</li>
                  <li>Movilizacion y preparacion de los equipos</li>
                  <li>Adquisicion, instalacion y preparacion de equipamientos</li>
                  <li>Servidor con soporte y mantenimiento por 2 anos</li>
                </ul>
              </div>
            </div>
          </section>
        ),
      },
      {
        id: 'cierre',
        title: 'Decisiones Inmediatas',
        subtitle: 'Para sostener el avance del cronograma',
        content: (
          <section className="closing-layout">
            <div className="closing-topflow">
              {[
                'Asignar responsables',
                'Validar formatos',
                'Activar recursos',
                'Monitorear semanalmente',
              ].map((item) => (
                <article key={item}>
                  <p>{item}</p>
                </article>
              ))}
            </div>

            <div className="closing-panels">
              <div className="closing">
                <div className="decision-cards">
                {[
                  'Confirmar responsables por frente de trabajo',
                  'Cerrar formatos y plataforma de intercambio',
                  'Garantizar recursos para el arranque del 9-mar',
                  'Activar seguimiento semanal con tablero de hitos',
                ].map((txt, index) => (
                  <article key={txt}>
                    <span className="decision-index">{String(index + 1).padStart(2, '0')}</span>
                    <p>{txt}</p>
                  </article>
                ))}
              </div>
            </div>

              <aside className="closing-aside">
                <article>
                  <span>Prioridad 1</span>
                  <p>Gobernanza semanal y seguimiento por hitos.</p>
                </article>
                <article>
                  <span>Prioridad 2</span>
                  <p>Asignacion de responsables por frente operativo.</p>
                </article>
                <article>
                  <span>Prioridad 3</span>
                  <p>Control de dependencias entre campo, SIG y tecnologia.</p>
                </article>
              </aside>
            </div>
          </section>
        ),
      },
    ],
    [agendaItems, planData],
  )

  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(presentationPassword.trim() === '')

  const nextSlide = () => setCurrent((prev) => Math.min(prev + 1, slides.length - 1))
  const prevSlide = () => setCurrent((prev) => Math.max(prev - 1, 0))

  const handleUnlock = (event) => {
    event.preventDefault()
    if (passwordInput === presentationPassword) {
      setIsUnlocked(true)
      setAuthError(false)
      return
    }
    setAuthError(true)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!isUnlocked) {
        return
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        nextSlide()
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        prevSlide()
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        const root = document.documentElement
        if (!document.fullscreenElement) {
          root.requestFullscreen?.()
        } else {
          document.exitFullscreen?.()
        }
      }
    }

    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [isUnlocked, slides.length])

  useEffect(() => {
    if (!authError) {
      return
    }
    const timeout = setTimeout(() => setAuthError(false), 500)
    return () => clearTimeout(timeout)
  }, [authError])

  const activeSlide = slides[current]
  const isCoverSlide = activeSlide.id === 'portada'
  const isProjectorSlide = ['agenda', 'productos', 'cierre'].includes(activeSlide.id)

  if (!isUnlocked) {
    return (
      <main className="auth-screen">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <form className={`auth-card${authError ? ' auth-shake' : ''}`} onSubmit={handleUnlock}>
          <small>Acceso Protegido</small>
          <h1>Propuesta de agenda - Reunion 1</h1>
          <p>Ingrese la clave para abrir la presentacion.</p>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(event) => {
              setPasswordInput(event.target.value)
              if (authError) {
                setAuthError(false)
              }
            }}
            autoFocus
          />
          <button type="submit">Ingresar</button>
          {authError ? <span className="auth-error">Password incorrecto</span> : null}
        </form>
      </main>
    )
  }

  return (
    <main className={`deck${isCoverSlide ? ' deck-cover' : ''}${isProjectorSlide ? ' deck-projector' : ''}`}>
      <header className="deck-top">
        <div>
          <small>INAPA | Soluciones Urbanas</small>
          <h1>{activeSlide.title}</h1>
          <p>{activeSlide.subtitle}</p>
        </div>

        <div className="slide-counter">
          <div className="nav-actions nav-actions-top">
            <button type="button" onClick={prevSlide} disabled={current === 0} aria-label="Anterior">
              ←
            </button>
            <button
              type="button"
              onClick={nextSlide}
              disabled={current === slides.length - 1}
              aria-label="Siguiente"
            >
              →
            </button>
          </div>

          <span>
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>

          <div className="dot-wrap dot-wrap-top">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={index === current ? 'dot active' : 'dot'}
                onClick={() => setCurrent(index)}
                aria-label={`Ir a diapositiva ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          <button
            type="button"
            className="fullscreen-btn"
            onClick={() => {
              const root = document.documentElement
              if (!document.fullscreenElement) {
                root.requestFullscreen?.()
              } else {
                document.exitFullscreen?.()
              }
            }}
            aria-label="Toggle full screen"
          >
            ⛶
          </button>
        </div>
      </header>

      <section className="deck-body">{activeSlide.content}</section>
    </main>
  )
}

export default App
