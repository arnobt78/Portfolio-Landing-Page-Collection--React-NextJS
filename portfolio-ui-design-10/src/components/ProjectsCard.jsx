import { FaGithubSquare } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { useState } from 'react';

// Single project card: url = live site, github = repo; alt from title for accessibility
const ProjectsCard = ({ url, img, github, title, text }) => {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className='bg-white rounded-lg shadow-md hover:shadow-xl duration-300'>
      {imageFailed ? (
        <div role='img' aria-label={`${title} image unavailable`} className='w-full h-64 rounded-t-lg bg-slate-100 flex items-center justify-center text-slate-600'>
          Image unavailable
        </div>
      ) : (
        <img
          src={img}
          alt={title}
          loading='lazy'
          decoding='async'
          onError={() => setImageFailed(true)}
          className='w-full object-cover rounded-t-lg h-64'
        />
      )}
      <div className='capitalize p-8'>
        <h2 className='text-xl tracking-wide font-medium'>{title}</h2>
        <p className='mt-4 text-slate-700 leading-loose'>{text}</p>
        <div className='mt-4 flex gap-x-4'>
          <a href={url} aria-label={`View ${title} (demo link)`} className='inline-flex min-h-11 min-w-11 items-center justify-center'>
            <TbWorldWww className='h-8 w-8 text-slate-500 hover:text-black duration-300' />
          </a>
          <a href={github} aria-label={`${title} source (demo link)`} className='inline-flex min-h-11 min-w-11 items-center justify-center'>
            <FaGithubSquare className='h-8 w-8 text-slate-500 hover:text-black duration-300' />
          </a>
        </div>
      </div>
    </article>
  );
};
export default ProjectsCard;
