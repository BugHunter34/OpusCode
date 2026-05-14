import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import PlanGrid from '../components/PlanGrid'

function WebyPage() {
  const { t } = useTranslation('plans')

  const plans = [
    t('websites.plans.simple', { returnObjects: true }),
    t('websites.plans.corporate', { returnObjects: true }),
    t('websites.plans.large', { returnObjects: true }),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('websites.eyebrow')}
        title={t('websites.title')}
        titleHighlight={t('websites.titleHighlight', { defaultValue: 'web' })}
        text={t('websites.text')}
      />
      <PlanGrid 
        plans={plans} 
        category={t('websites.category')} 
      />
    </>
  )
}

export default WebyPage