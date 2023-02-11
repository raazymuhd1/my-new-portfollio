import {useState, useEffect} from 'react'
import "./Work.scss"
import { AiFillEye, AiFillGithub } from "react-icons/ai"
import { motion } from 'framer-motion'
import { AppWrap, MotionWrap } from "../../wrapper"
import { urlFor, client } from "../../client"

const Work = () => {
   const [activeFilter, setActiveFilter] = useState('All')
   const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1  })
   const [works, setWorks] = useState([])
   const [workFilter, setWorkFilter] = useState([])

   useEffect(() => {
      const query = '*[_type == "works"]'

      client.fetch(query)
      .then(work => { 
          setWorks(work)
          setWorkFilter(work)
      })
   }, [])

  const handleWorkFilter = (item) => {
    setActiveFilter(item)
    setAnimateCard([{ y: 100, opacity: 0  }])

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }])

      if(item === "All") {
        setWorkFilter(works)
      } else {
        setWorkFilter(works.filter(work => work.tags.includes(item)))
      }
    }, 500)
  }

  return (
    <>
      <h2 className='head-text'> My <span> Portfolio </span> </h2>

      <div className="app__work-filter">
         {['UI/UX', 'Mobile App', 'React Js', 'All'].map((item, idx) => (
            <div 
                key={idx} 
                onClick={() => handleWorkFilter(item)}
                className={`app__work-filter-item app__flex p-text ${ activeFilter === item ? 'item-active' : "" }`}
                >
                {item}
            </div>
         ))  }
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.9, delayChildren: 0.9 }}
        className="app__work-portfolio"
      >
        { workFilter.map((work, idx) => (
          <div className="app__work-item app__flex" key={idx}>
              <div className="app__work-img app__flex">
                 <img src={urlFor(work.imgUrl)} alt="Works" />
                <motion.div
                  whileHover={{opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: "easeInOut",staggerChildren: 0.5 }}
                  className="app__work-hover app__flex"
                > 
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >  
                        <AiFillEye />
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >  
                        <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
          </div>
          
            <div className="app__work-content app__flex">
                <h4 className='bold-text'> {work.title} </h4>
                <p className='p-text' style={{marginTop: 10}}> {work.description} 
                </p>
                <div className="app__work-tag app__flex">
                   <p className='p-text'> {work.tags[0]} </p>
                </div>
            </div>
          </div>
        )) }
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work, 'app__works'), 'works', 'app__primarybg')