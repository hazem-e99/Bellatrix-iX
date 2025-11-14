import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbout, selectAboutItem, selectAboutStatus } from '../store/about/aboutSlice';
import AboutHero from '../components/About/AboutHero';
import AboutMission from '../components/About/AboutMission';
import AboutJourney from '../components/About/AboutJourney';
import AboutTeam from '../components/About/AboutTeam';
import AboutValues from '../components/About/AboutValues';
import AboutDifferentiators from '../components/About/AboutDifferentiators';
import AboutMilestones from '../components/About/AboutMilestones';
import AboutCTA from '../components/About/AboutCTA';
import ContactForm from '../components/ContactForm';
import Modal from '../components/Modal';

const About = () => {
  const dispatch = useDispatch();
  const aboutData = useSelector(selectAboutItem);
  const aboutStatus = useSelector(selectAboutStatus);
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [cardsPerScreen, setCardsPerScreen] = useState(3);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Fetch about data on component mount
  useEffect(() => {
    if (!aboutData) {
      dispatch(fetchAbout());
    }
  }, [dispatch, aboutData]);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Use data from Redux store or fallback to default values
  const values = aboutData?.values?.items || [
    {
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative thinking to solve complex business challenges.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Excellence',
      description: 'We deliver exceptional quality in every project, exceeding client expectations consistently.',
      color: 'from-gray-400 to-gray-600'
    },
    {
      title: 'Integrity',
      description: 'We act with honesty and transparency, building trust through ethical business practices.',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Partnership',
      description: 'We work closely with our clients as trusted partners in their digital transformation journey.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const teamMembers = aboutData?.team?.members || [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      image: '/public/images/ourteam/1.jpg',
      bio: 'Visionary leader with 20+ years in enterprise software solutions.',
      expertise: ['Strategic Planning', 'Business Development', 'Leadership']
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: '/public/images/ourteam/2.jpg',
      bio: 'Technology expert specializing in NetSuite implementations and cloud solutions.',
      expertise: ['NetSuite Development', 'Cloud Architecture', 'System Integration']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '/public/images/ourteam/3.jpg',
      bio: 'Operations specialist ensuring seamless project delivery and client success.',
      expertise: ['Project Management', 'Process Optimization', 'Quality Assurance']
    },
    {
      name: 'David Kim',
      role: 'Lead Consultant',
      image: '/public/images/ourteam/1.jpg',
      bio: 'Senior consultant with expertise in business process optimization.',
      expertise: ['Business Analysis', 'Process Design', 'Training']
    },
    {
      name: 'Lisa Thompson',
      role: 'Senior Developer',
      image: '/public/images/ourteam/2.jpg',
      bio: 'Full-stack developer with deep expertise in NetSuite customization.',
      expertise: ['NetSuite SuiteScript', 'JavaScript', 'API Integration']
    },
    {
      name: 'Alex Martinez',
      role: 'Business Analyst',
      image: '/public/images/ourteam/3.jpg',
      bio: 'Experienced analyst specializing in business process mapping and optimization.',
      expertise: ['Requirements Gathering', 'Process Mapping', 'User Training']
    }
  ];

  // Get cards per screen size
  const getCardsPerScreen = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2;  // md screens
      return 1; // mobile screens
    }
    return 3; // default for SSR
  };

  // Update cards per screen on window resize
  useEffect(() => {
    const updateCardsPerScreen = () => {
      setCardsPerScreen(getCardsPerScreen());
    };
    updateCardsPerScreen();
    window.addEventListener('resize', updateCardsPerScreen);
    return () => window.removeEventListener('resize', updateCardsPerScreen);
  }, []);

  // Carousel sliding effect
  const needsCarousel = teamMembers.length > cardsPerScreen;
  useEffect(() => {
    if (!needsCarousel || isHovering) return;
    const slideSpeed = 0.3; // pixels per second - very slow
    let animationId;
    const animate = () => {
      setSlideOffset(prev => {
        const newOffset = prev - slideSpeed / 60; // 60fps
        if (newOffset <= -100) {
          // Reset to beginning for seamless loop
          return 0;
        }
        return newOffset;
      });
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [needsCarousel, cardsPerScreen, teamMembers.length, isHovering]);

  const milestones = aboutData?.milestones?.items || aboutData?.journey?.timeline || [
    {
      year: '2008',
      title: 'Company Founded',
      description: 'Bellatrix was established with a vision to transform businesses through technology.'
    },
    {
      year: '2012',
      title: 'First 100 Clients',
      description: 'Reached our first major milestone of serving 100 satisfied clients.'
    },
    {
      year: '2016',
      title: 'NetSuite Gold Partner',
      description: 'Achieved NetSuite Gold Partner status, recognizing our expertise.'
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Expanded operations to serve clients across multiple continents.'
    },
    {
      year: '2023',
      title: '500+ Projects',
      description: 'Successfully completed over 500 implementation projects.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Pioneered AI-powered solutions for enhanced business intelligence.'
    }
  ];

  const differentiators = aboutData?.differentiators?.items || [
    {
      title: 'Industry Expertise',
      description: 'Deep understanding of various industries and their unique challenges.',
      stats: '15+ Industries'
    },
    {
      title: 'Proven Methodology',
      description: 'Time-tested implementation methodology ensuring project success.',
      stats: '98% Success Rate'
    },
    {
      title: 'Ongoing Support',
      description: '24/7 support and maintenance services for continuous optimization.',
      stats: '24/7 Support'
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored solutions designed specifically for your business needs.',
      stats: '100% Custom'
    }
  ];

  // Show loading state while data is being fetched
  if (aboutStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHero data={aboutData?.hero} />
      <AboutMission data={aboutData?.mission} />
      <AboutJourney data={aboutData?.journey} />
      <AboutTeam
        teamMembers={teamMembers}
        cardsPerScreen={cardsPerScreen}
        slideOffset={slideOffset}
        isHovering={isHovering}
        setIsHovering={setIsHovering}
        data={aboutData?.team}
      />
      <AboutValues values={values} data={aboutData?.values} />
      <AboutDifferentiators differentiators={differentiators} data={aboutData?.differentiators} />
      <AboutMilestones milestones={milestones} data={aboutData?.milestones} />
      <AboutCTA onOpenContactModal={openContactModal} data={aboutData?.cta} />
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Contact Us"
        subtitle="Let's discuss your project needs"
      >
        <div className="p-2">
          <ContactForm onSuccess={closeContactModal} />
        </div>
      </Modal>
    </div>
  );
};

export default About; 