import EmberHero from '../components/hero/EmberHero'
import Nav from '../components/nav/Nav'
import DashboardPreview from '../components/demos/DashboardPreview'
import AiChatPreview from '../components/demos/AiChatPreview'
import AutomationPreview from '../components/demos/AutomationPreview'
import WebsitePreview from '../components/demos/WebsitePreview'
import ProcessSection from '../components/process/ProcessSection'
import BuilderSection from '../components/builder/BuilderSection'
import CtaSection from '../components/cta/CtaSection'
import Footer from '../components/footer/Footer'
import useIntersection from '../hooks/useIntersection'
import styles from './Home.module.css'

export default function Home() {
  const demos = useIntersection({ threshold: 0.1 })
  const process = useIntersection({ threshold: 0.15 })
  const cta = useIntersection({ threshold: 0.15 })
  const footer = useIntersection({ threshold: 0.15 })

  return (
    <div className={styles.home}>
      {/* Réteg 2: EmberHero — 1-2. jelenet (parázs hero + IVERSO felirat) */}
      <EmberHero />
      <div id="hero-area" className={styles.heroSpacer} />

      {/* Nav — scroll-aware, hero-nál rejtett, scrollra megjelenik */}
      <Nav heroElementId="hero-area" />

      {/* 3. jelenet: 4 demó előzetes — stagger rise */}
      <section
        ref={demos.ref}
        className={`${styles.demos} ${demos.isVisible ? styles.visible : ''}`}
      >
        <div className={styles.demoItem}><DashboardPreview /></div>
        <div className={styles.demoItem}><AiChatPreview /></div>
        <div className={styles.demoItem}><AutomationPreview /></div>
        <div className={styles.demoItem}><WebsitePreview /></div>
      </section>

      {/* 4. jelenet: Folyamat — node sequence */}
      <section ref={process.ref} className={styles.processScene}>
        <ProcessSection animated={!process.isVisible} />
      </section>

      {/* 5. jelenet: Építős — block drop */}
      <section className={styles.builderScene}>
        <BuilderSection animated />
      </section>

      {/* 6. jelenet: CTA — glow reveal + bubble pop */}
      <section
        ref={cta.ref}
        className={`${styles.ctaScene} ${cta.isVisible ? styles.visible : ''}`}
      >
        <CtaSection />
      </section>

      {/* 7. jelenet: Footer — simple fade */}
      <section
        ref={footer.ref}
        className={`${styles.footerScene} ${footer.isVisible ? styles.visible : ''}`}
      >
        <Footer />
      </section>
    </div>
  )
}
