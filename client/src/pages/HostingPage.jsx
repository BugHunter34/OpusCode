import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import PlanGrid from '../components/PlanGrid'

function HostingPage() {
  const { t } = useTranslation('plans')

  const plans = [
    t('hosting.plans.start', { returnObjects: true }),
    t('hosting.plans.basic', { returnObjects: true }),
    t('hosting.plans.business', { returnObjects: true }),
    t('hosting.plans.premium', { returnObjects: true }),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('hosting.eyebrow')}
        title={t('hosting.title')}
        titleHighlight={t('hosting.titleHighlight', { defaultValue: 'Hosting' })}
        text={t('hosting.text')}
      />
      <PlanGrid 
        plans={plans} 
        category={t('hosting.category')} 
        desktopColumns={4} 
        containerMaxWidthClass="max-w-7xl" 
      />
    </>
  )
}

export default HostingPage