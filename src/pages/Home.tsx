import EmberHero from '../components/hero/EmberHero'
import Nav from '../components/nav/Nav'
import DemoCard from '../components/ui/DemoCard'
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
  const process = useIntersection({ threshold: 0.15 })
  const cta = useIntersection({ threshold: 0.15 })
  const footer = useIntersection({ threshold: 0.15 })

  return (
    <div className={styles.home}>
      {/* Réteg 2: EmberHero — 1-2. jelenet (parázs hero + IVERSO felirat) */}
      <EmberHero />
      <div id="hero-area" className={styles.heroSpacer}>
        <p className={styles.slogan}>Let&apos;s build something</p>
      </div>

      {/* Nav */}
      <Nav heroElementId="hero-area" />

      {/* 3. jelenet: 4 demó előzetes */}
      <div className={styles.previewSection}>

        {/* 1. Dashboard — info BAL, demo JOBB (széles) */}
        <DemoCard
          titleKey="dashboards.title"
          subtitleKey="dashboards.subtitle"
          descriptionKey="demos.dashboard.description"
          linkTo="/dashboardok"
          layout="info-left"
          ratio="wide-demo"
        >
          <DashboardPreview />
        </DemoCard>

        {/* 2. Weboldal — demo BAL, info JOBB */}
        <DemoCard
          titleKey="websites.title"
          subtitleKey="websites.subtitle"
          descriptionKey="demos.websites.description"
          linkTo="/weboldalak"
          layout="info-right"
          ratio="normal"
        >
          <WebsitePreview />
        </DemoCard>

        {/* 3. AI Chat — info BAL, demo JOBB */}
        <DemoCard
          titleKey="ai.title"
          subtitleKey="ai.subtitle"
          descriptionKey="demos.ai.description"
          linkTo="/ai"
          layout="info-left"
          ratio="normal"
        >
          <AiChatPreview />
        </DemoCard>

        {/* 4. Automatizáció — demo BAL, info JOBB (széles demo) */}
        <DemoCard
          titleKey="automation.title"
          subtitleKey="automation.subtitle"
          descriptionKey="demos.automation.description"
          linkTo="/automatizacio"
          layout="info-right"
          ratio="wide-demo"
        >
          <AutomationPreview />
        </DemoCard>

      </div>

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
