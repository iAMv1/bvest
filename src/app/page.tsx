import Link from 'next/link';
import { SDGColorStrip } from '@/components/SDGColorStrip';
import { SDGBadge } from '@/components/SDGBadge';
import { SDGBoxCollage } from '@/components/SDGBoxCollage';
import { BvestLogo } from '@/components/BvestLogo';
import { sdgData } from '@/lib/sdg-data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      {/* The section itself is relative so the absolutely-positioned collage stays inside it */}
      <section className="relative overflow-hidden bg-background pt-2 md:pt-4 pb-0 transition-colors duration-200">

        {/* SDG box collage — decorative background, bottom-right, z-0 */}
        <SDGBoxCollage />

        {/* Hero copy — z-10 keeps it above the collage */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pointer-events-none">
          <div className="max-w-xl pb-28 md:pb-40 pointer-events-auto">
            {/* Typographic logo wordmark as the hero heading */}
            <div className="mb-8 text-gray-900 dark:text-white">
              <BvestLogo size={240} showSubtitle={true} />
            </div>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-lg mb-10 leading-relaxed font-medium">
              The Annual Technical Fest themed around the UN Sustainable Development Goals.
            </p>

            {/* Placeholder dates/venue */}
            <div className="flex flex-col sm:flex-row items-start gap-4 text-gray-500 dark:text-gray-400 mb-12 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300">TODO: Date</span>
                <span>October 24 &ndash; 26, 2026 (Placeholder)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300">TODO: Venue</span>
                <span>BVCOE Campus (Placeholder)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#goals"
                className="inline-flex px-8 py-4 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                Explore the 17 Goals
              </Link>
              <Link
                href="/society/login"
                className="inline-flex px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300 pointer-events-auto"
              >
                Society Portal
              </Link>
            </div>
          </div>
        </div>

        <SDGColorStrip />
      </section>

      {/* 2. About Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">Innovating for a Sustainable Future</h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          BVEST is our premier college technical fest where innovation meets impact. We've structured this year's entire fest around the 17 UN Sustainable Development Goals (SDGs), challenging our students to build solutions for the world's most pressing problems.
        </p>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Each participating society and club is assigned one specific SDG. They host technical events, hackathons, and showcases entirely dedicated to their assigned goal's domain.
        </p>
      </section>



      {/* 3. The 17 Goals Grid */}
      <section id="goals" className="py-32 px-6 bg-gray-50/50 dark:bg-gray-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">The 17 Goals</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Discover the events hosted by our societies across all 17 domains.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sdgData.map((sdg) => (
              <Link
                key={sdg.number}
                id={`goal-${sdg.number}`}
                href={`/events/${sdg.number}`}
                className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Left color border accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-2 transition-all duration-300 group-hover:w-3"
                  style={{ backgroundColor: sdg.hex }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-heading font-bold text-xl shadow-sm"
                  style={{ backgroundColor: sdg.hex }}
                >
                  {sdg.number}
                </div>

                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white leading-tight">
                  {sdg.name}
                </h3>

                <div className="mt-auto pt-5 w-full border-t border-gray-50 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2"><span className="font-semibold text-gray-700 dark:text-gray-300">Hosted by:</span> [Society Name Placeholder]</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold text-gray-700 dark:text-gray-300">Event:</span> [Event Name Placeholder]</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Events Preview Section */}
      <section id="featured-events" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Featured Events</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl">A sneak peek at some of the major competitions happening this year.</p>
          </div>
          <Link href="#goals" className="text-base font-semibold text-gray-900 dark:text-white hover:underline flex items-center gap-2">
            View all events <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example Event 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-6">
              <SDGBadge sdg={sdgData[3]} /> {/* Quality Education */}
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 dark:text-white">Code4Ed Hackathon (Placeholder)</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">Hosted by: Tech Society (Placeholder)</p>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
              Build innovative ed-tech solutions to make quality education accessible to everyone in remote areas.
            </p>
            <button className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">Learn more</button>
          </div>

          {/* Example Event 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-6">
              <SDGBadge sdg={sdgData[6]} /> {/* Clean Energy */}
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 dark:text-white">Renewable Robotics (Placeholder)</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">Hosted by: Robotics Club (Placeholder)</p>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
              Design and race autonomous robots powered entirely by alternative energy sources.
            </p>
            <button className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">Learn more</button>
          </div>

          {/* Example Event 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-6">
              <SDGBadge sdg={sdgData[12]} /> {/* Climate Action */}
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 dark:text-white">Climate Data Challenge (Placeholder)</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">Hosted by: Data Science Group (Placeholder)</p>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
              Analyze massive environmental datasets to predict and visualize local climate impact over the next decade.
            </p>
            <button className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">Learn more</button>
          </div>
        </div>
      </section>

      {/* 5. Sponsors/Partners Strip */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950/40 border-y border-gray-100 dark:border-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-12">Supported by our amazing partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale dark:invert">
            {/* Placeholder Logos */}
            <div className="text-2xl font-heading font-bold text-gray-500 dark:text-gray-400">[Sponsor Logo 1]</div>
            <div className="text-2xl font-heading font-bold text-gray-500 dark:text-gray-400">[Sponsor Logo 2]</div>
            <div className="text-2xl font-heading font-bold text-gray-500 dark:text-gray-400">[Sponsor Logo 3]</div>
            <div className="text-2xl font-heading font-bold text-gray-500 dark:text-gray-400">[Sponsor Logo 4]</div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="contact" className="bg-white dark:bg-black pt-20 mt-auto border-t border-gray-100 dark:border-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left flex flex-col items-center md:items-start text-gray-900 dark:text-white">
            <BvestLogo size={88} />
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Innovating for a Sustainable Future.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">[TODO: Twitter]</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">[TODO: Instagram]</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">[TODO: LinkedIn]</a>
            <a href="mailto:contact@placeholder.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">[TODO: contact@bvest.edu]</a>
          </div>
        </div>
        <SDGColorStrip />
      </footer>
    </div>
  );
}
