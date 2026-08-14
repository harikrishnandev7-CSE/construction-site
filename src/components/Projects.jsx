import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { MapPin, Home, Maximize, ArrowRight } from 'lucide-react';
import { featuredProjects } from '../data/projects';
import styles from './Projects.module.css';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div className={styles.imageWrap}>
        <img
          src={project.image}
          alt={project.imageAlt}
          className={styles.image}
          loading="lazy"
          width={900}
          height={600}
        />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{project.name}</h3>
          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <MapPin size={13} aria-hidden="true" />
              {project.location}
            </span>
            <span className={styles.metaItem}>
              <Home size={13} aria-hidden="true" />
              {project.homeType}
            </span>
            <span className={styles.metaItem}>
              <Maximize size={13} aria-hidden="true" />
              {project.builtArea}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ showAll = false, projects: projectsProp }) {
  const displayProjects = projectsProp || featuredProjects;
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className={`section ${styles.projects}`} aria-labelledby="projects-heading">
      <div className="container">
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-eyebrow">
              {showAll ? 'All Projects' : 'Featured Projects'}
            </span>
          </div>
          <h2 id="projects-heading" className="section-heading">
            Homes We've{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              Built
            </em>
          </h2>
          {!showAll && (
            <p className={styles.subheading}>
              A selection of completed homes — each one a unique collaboration between family and craft.
            </p>
          )}
        </motion.div>

        <div className={styles.grid}>
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {!showAll && (
          <motion.div
            className={styles.viewAllWrap}
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link to="/projects" className={`btn btn-outline ${styles.viewAllBtn}`}>
              View All Projects
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
