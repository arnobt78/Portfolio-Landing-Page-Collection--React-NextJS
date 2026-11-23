import {
  mockAbouts,
  mockWorks,
  mockSkills,
  mockExperiences,
  mockTestimonials,
  mockBrands,
} from './mockData';

// The portfolio is a local demo; no CMS request or message delivery occurs.
const client = {
  fetch: (query) => {
    if (query.includes('abouts')) return Promise.resolve(mockAbouts);
    if (query.includes('works')) return Promise.resolve(mockWorks);
    if (query.includes('skills')) return Promise.resolve(mockSkills);
    if (query.includes('experiences')) return Promise.resolve(mockExperiences);
    if (query.includes('testimonials')) return Promise.resolve(mockTestimonials);
    if (query.includes('brands')) return Promise.resolve(mockBrands);
    return Promise.resolve([]);
  },
  create: () => Promise.resolve({ demo: true }),
};

export { client };

// Demo data already contains image URLs.
export const urlFor = (source) => source;
