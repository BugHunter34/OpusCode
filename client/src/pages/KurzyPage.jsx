import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import PlanGrid from '../components/PlanGrid'

function KurzyPage() {
  const { t } = useTranslation('plans')

  const plans = [
    t('courses.plans.start', { returnObjects: true }),
    t('courses.plans.popular', { returnObjects: true }),
    t('courses.plans.custom', { returnObjects: true }),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('courses.eyebrow')}
        title={t('courses.title')}
        text={t('courses.text')}
      />
      <PlanGrid plans={plans} category={t('courses.category')} />
    </>
  )
}

export default KurzyPage