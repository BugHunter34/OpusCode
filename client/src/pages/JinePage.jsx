import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import PlanGrid from '../components/PlanGrid'

function JinePage() {
  const { t } = useTranslation('plans')

  const plans = [
    t('other.plans.design', { returnObjects: true }),
    t('other.plans.automation', { returnObjects: true }),
    t('other.plans.support', { returnObjects: true }),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('other.eyebrow')}
        title={t('other.title')}
        text={t('other.text')}
      />
      <PlanGrid plans={plans} category={t('other.category')} />
    </>
  )
}

export default JinePage