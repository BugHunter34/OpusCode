import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import PlanGrid from '../components/PlanGrid'

function WebAplikacePage() {
  const { t } = useTranslation('plans')

  const plans = [
    t('webApps.plans.start', { returnObjects: true }),
    t('webApps.plans.business', { returnObjects: true }),
    t('webApps.plans.custom', { returnObjects: true }),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('webApps.eyebrow')}
        title={t('webApps.title')}
        titleHighlight={t('webApps.titleHighlight', { defaultValue: 'víc' })}
        text={t('webApps.text')}
      />
      <PlanGrid 
        plans={plans} 
        category={t('webApps.category')} 
      />
    </>
  )
}

export default WebAplikacePage