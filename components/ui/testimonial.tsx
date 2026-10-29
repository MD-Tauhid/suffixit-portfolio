"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import Image from "next/image";
import { useRef } from "react";

function ClientFeedback() {
    const testimonialRef = useRef<HTMLDivElement>(null);
  
    const revealVariants = {
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.4,
          duration: 0.5,
        },
      }),
      hidden: {
        filter: "blur(10px)",
        y: -20,
        opacity: 0,
      },
    };
  
  return (
    <main className="w-full bg-white">
      <section className="relative  h-full container text-black mx-auto  rounded-lg  py-14 bg-white" ref={testimonialRef}>
        <article className={"max-w-screen-md mx-auto text-center space-y-2 "} >
          <TimelineContent as="h1" className={"xl:text-4xl text-3xl  font-medium"} animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            Trusted by Startups and the worlds&apos;s largest companies
          </TimelineContent>
          <TimelineContent as="p" className={"mx-auto text-gray-500"} animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            Let&apos;s hear how hypershpere client&apos;s feels about our service
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3  gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ">
            <TimelineContent animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-[#0072bc] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p>
                  &quot;Hypersphere has been a game-changer for us. Their service is
                  top-notch and their team is incredibly responsive.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-sm">
                      Guillermo Rauch
                    </h2>
                    <p className="text-white/80">CEO of Enigma</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/68/68c583189c0e1ce21e113c290c7052e2293db7036c14e54a632fb15290d9b8c4.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit  lg:shrink-0 flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p>
                  &quot;We&apos;ve seen incredible results with Hypersphere. Their
                  expertise, dedication.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Rika Shinoda</h2>
                    <p className="text-white/80">CEO of Kintsugi</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/86/86a1c9c1309ca1d9fc99d59452c9c4a0f50ba192ddb264a3a0c76c4e78d7a405.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full  md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &quot;Their team is highly professional, and their innovative
                  solutions have truly transformed the way we operate.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Reacher{" "}
                    </h2>
                    <p className="lg:text-base text-sm text-white/70">CEO of OdeaoLabs</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/d7/d7ef0bb3c8517d3cb8bd73c054a87fcfbe86f836cff141a280a6431faa73847a.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &quot;We&apos;re extremely satisfied with Hypersphere. Their expertise
                  and dedication have exceeded our expectations.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">John </h2>
                    <p className="lg:text-base text-sm text-white/70">CEO of Labsbo</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/aa/aaff9c71c06802290840b09e412d9d7a92159d3182cb1fb0e88c216711d27e47.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &quot;Their customer support is absolutely exceptional. They are
                  always available, incredibly helpful.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Steven Sunny
                    </h2>
                    <p className="lg:text-base text-sm text-white/70">CEO of boxefi</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/34/34e73337944b73c8b25343cb5ff45ac43bb85358b64dc8d54f88769191d55253.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p>
                  &quot;Hypersphere has been a key partner in our growth journey.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Guillermo Rauch</h2>
                    <p className="text-white/80">CEO of OdeaoLabs</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/5f/5fd63161d12eb2ed836aba11edd36efd6824e27b6a96151c1ee998a037b50f6d.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-[#0072bc] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p>
                  &quot;Hypersphere has been a true game-changer for us. Their
                  exceptional service, combined with their deep expertise and
                  commitment to excellence, has made a significant impact on our
                  business.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Paul Brauch</h2>
                    <p className="text-white/80">CTO of Spectrum</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/03/037ea54a1e1b16d4cb42b0ef3d87b27d6b39d3ced535afa3f97ef861753b6ea8.jpg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>

        <div className="absolute border-b-2 border-[#e6e6e6] bottom-4 h-16 z-[2] md:w-full w-[90%] md:left-0 left-[5%]">
          <div className="container mx-auto w-full h-full relative before:absolute before:-left-2 before:-bottom-2 before:w-4 before:h-4 before:bg-white before:shadow-sm before:border border-gray-200 before:border-gray-300 after:absolute after:-right-2 after:-bottom-2 after:w-4 after:h-4 after:bg-white after:shadow-sm after:border after:border-gray-300 "></div>
        </div>
      </section>
    </main>
  );
}

export const Component = ClientFeedback;
export default ClientFeedback;

