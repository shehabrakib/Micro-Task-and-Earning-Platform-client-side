import { Link } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  heroSlides,
  processSteps,
  testimonials,
  whyTaskEarnFeatures,
} from '../mock/homePageData'
import { payments, submissions, tasks, users } from '../mock/mockData'
import 'swiper/css'
import 'swiper/css/pagination'

function HomePage() {
  // We calculate top workers from mock data, matching PRD requirement: top 6 by coins.
  const bestWorkers = users
    .filter((user) => user.role === 'worker')
    .sort((firstWorker, secondWorker) => secondWorker.coin - firstWorker.coin)
    .slice(0, 6)

  const totalWorkers = users.filter((user) => user.role === 'worker').length
  const totalBuyers = users.filter((user) => user.role === 'buyer').length
  const approvedSubmissions = submissions.filter(
    (submission) => submission.status === 'approved',
  )
  const totalCoinsDistributed = approvedSubmissions.reduce(
    (sum, submission) => sum + submission.payable_amount,
    0,
  )
  const totalPayments = payments.length

  return (
    <div className="space-y-16 pb-16 sm:space-y-20 sm:pb-20 lg:space-y-24">
      <section className="hero-swiper relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="min-h-107.5 sm:min-h-125"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative min-h-107.5 bg-linear-to-br from-indigo-950 via-indigo-800 to-indigo-700 sm:min-h-125">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
                <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

                <div className="relative mx-auto flex min-h-107.5 max-w-7xl items-center px-4 py-12 sm:min-h-125 sm:px-6 lg:px-8">
                  <div className="animate-fade-up max-w-3xl space-y-6 text-white">
                    <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-indigo-100">
                      Trusted micro-task platform
                    </p>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                      {slide.heading}
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={slide.primaryActionPath}
                        className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                      >
                        {slide.primaryActionLabel}
                      </Link>
                      <Link
                        to={slide.secondaryActionPath}
                        className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        {slide.secondaryActionLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-600">
            Best Workers
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Top performers by coin balance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            This list comes directly from `mockData` and shows the top six
            workers sorted by current coin totals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bestWorkers.map((worker, index) => (
            <article
              key={worker._id}
              className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  Rank #{index + 1}
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {worker.coin} coins
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src={worker.photoURL}
                  alt={worker.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {worker.name}
                  </h3>
                  <p className="text-sm text-slate-500">{worker.email}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-indigo-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-600">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              What users say about TaskEarn
            </h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="mt-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <article className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm sm:p-10">
                  <p className="text-2xl font-semibold text-indigo-300">"</p>
                  <p className="mt-2 text-base leading-7 text-slate-700 sm:text-lg">
                    {testimonial.quote}
                  </p>
                  <div className="mt-7 flex items-center gap-4">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                    <div>
                      <p className="text-base font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-600">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Three simple steps from task creation to reward
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article
              key={step.id}
              className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-indigo-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-200">
              Platform Stats
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Snapshot from current mock data
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="animate-fade-up rounded-2xl border border-white/15 bg-white/10 p-6">
              <p className="text-sm text-indigo-100">Tasks available</p>
              <p className="mt-3 text-4xl font-semibold">{tasks.length}</p>
            </article>
            <article className="animate-fade-up rounded-2xl border border-white/15 bg-white/10 p-6">
              <p className="text-sm text-indigo-100">Workers active</p>
              <p className="mt-3 text-4xl font-semibold">{totalWorkers}</p>
            </article>
            <article className="animate-fade-up rounded-2xl border border-white/15 bg-white/10 p-6">
              <p className="text-sm text-indigo-100">Buyers active</p>
              <p className="mt-3 text-4xl font-semibold">{totalBuyers}</p>
            </article>
            <article className="animate-fade-up rounded-2xl border border-white/15 bg-white/10 p-6">
              <p className="text-sm text-indigo-100">Coins distributed</p>
              <p className="mt-3 text-4xl font-semibold">
                {totalCoinsDistributed}
              </p>
            </article>
          </div>

          <p className="mt-6 text-center text-sm text-indigo-200">
            Total payment records captured: {totalPayments}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-600">
            Why TaskEarn
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Built for clarity, speed, and trust
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {whyTaskEarnFeatures.map((feature) => (
            <article
              key={feature.id}
              className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                Feature
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
