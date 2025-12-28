import React from "react";
// import MagneticButton from "../../../components/MagneticButton"; // Uncomment if using MagneticButton

const blogPosts = [
  {
    image: "/images/blogimage1.svg",
    category: "Design",
    readTime: "5 min read",
    title: "The psychology of color in 2026",
    description: "Discover how palette choices influence user trust and decision-making.",
  },
  {
    image: "/images/blogimage2.svg",
    category: "Tech",
    readTime: "5 min read",
    title: "Why minimalism is evolving fast",
    description: "Exploring the shift toward maximalism in modern interface design",
  },
];

export const BlogSection = () => {
  return (
    <section className="w-full flex justify-center bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div
        // CONVERTED PADDING/GAP TO RESPONSIVE CLASSES
        // Mobile: py-16 px-6 gap-10
        // Desktop (lg): Matches your original pixels (py-[120px] px-[75px] gap-[64px])
        className="w-full max-w-[1440px] flex flex-col items-start py-16 px-6 gap-12 md:px-10 lg:pt-[120px] lg:pb-[120px] lg:pl-[75px] lg:pr-[75px] lg:gap-[64px]"
      >
        {/* Header */}
        <header
          // Switched to flex-col for mobile, restored flex-row for desktop
          // Height is auto for mobile, fixed 214px for desktop
          className="w-full flex flex-col lg:flex-row justify-between items-start h-auto gap-8 lg:gap-0 lg:h-[214px]"
        >
          <div className="flex flex-col items-start gap-3 h-full justify-between w-full lg:w-auto">
            {/* Title sizes adjusted for mobile (text-4xl) -> Tablet (5xl) -> Desktop (7xl) */}
            <h2 className="font-normal text-transparent text-4xl md:text-5xl lg:text-7xl leading-tight lg:leading-[72px]">
              <span
                className="font-medium text-text-dark dark:text-text-light tracking-[-1px] lg:tracking-[-2.07px] lg:leading-[86.4px]"
                style={{
                  fontFamily: "Inter Variable, Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                Insights from the
                <br />
              </span>
              <span
                className="italic text-text-dark dark:text-text-light tracking-[-1px] lg:tracking-[-2.07px] lg:leading-[86.4px]"
                style={{
                  fontFamily: "Libre Caslon Text, serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                studio
              </span>
            </h2>

            <p
              className="font-normal text-gray-700 dark:text-text-secondary text-base md:text-lg tracking-[0] leading-[24px] lg:leading-[28.8px] max-w-md lg:max-w-none"
              style={{
                fontFamily: "Inter Variable, Inter, sans-serif",
                fontWeight: 400,
              }}
            >
              We share what we learn. Read our latest thoughts on the future of
              digital design.
            </p>
          </div>

          <div className="h-full flex flex-col justify-start pb-0 lg:pb-[160px]">
            <button
              className="h-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-solid bg-bg-light dark:bg-bg-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{
                borderColor: "rgba(14, 14, 14, 0.4)",
              }}
            >
              <span
                className="font-medium text-text-dark dark:text-text-light text-lg lg:text-xl tracking-[0] leading-[30px] whitespace-nowrap"
                style={{
                  fontFamily: "Inter Variable, Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                View All
              </span>
            </button>
          </div>
        </header>

        {/* Blog Grid */}
        <div
          // Grid-cols-1 for mobile, grid-cols-2 for desktop
          // Height auto for mobile, fixed 456px for desktop
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[30px] h-auto lg:h-[456px]"
        >
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-6 lg:gap-[30px] w-full h-full"
            >
              {/* Image Area */}
              <div className="w-full h-[200px] lg:h-[240px] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  alt={post.title}
                  src={post.image}
                />
              </div>

              {/* Content Area */}
              <div className="flex flex-col items-start gap-4 w-full flex-1">
                {/* Tags Row */}
                <div className="flex items-center justify-between w-full">
                  <span className="inline-flex items-start px-3 py-1 bg-[#ff49201a] rounded-full border border-solid border-[#ff492033]">
                    <span
                      className="text-text-dark dark:text-text-light text-sm leading-[16.8px] font-normal"
                      style={{
                        fontFamily: "Inter Variable, Inter, sans-serif",
                      }}
                    >
                      {post.category}
                    </span>
                  </span>
                  <span
                    className="text-text-dark dark:text-text-light text-sm leading-[22.4px] font-normal"
                    style={{
                      fontFamily: "Inter Variable, Inter, sans-serif",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="flex flex-col gap-3">
                  {/* UPDATED TYPOGRAPHY: Responsive Text Size */}
                  <h3
                    className="text-text-dark dark:text-text-light line-clamp-2 text-[28px] md:text-[32px] lg:text-[40px]"
                    style={{
                      fontFamily: "Inter Variable, Inter, sans-serif",
                      fontWeight: 500, // Medium
                      // fontSize: '40px', // Moved to className for responsiveness
                      lineHeight: "120%", // 120%
                      letterSpacing: "-0.04em", // -4%
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="font-normal text-gray-700 dark:text-text-secondary text-base lg:text-lg tracking-[0] leading-[26px] lg:leading-[28.8px] line-clamp-2"
                    style={{
                      fontFamily: "Inter Variable, Inter, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;