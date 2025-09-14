import React from 'react';
import SupportSecondSec from './SupportSecondSec';
import SherpaCareServices from './SherpaCareServices';
import WhatWeOfferSection from './WhatWeOfferSection';
import DedicatedTeamSection from './DedicatedTeamSection';
import PrePackagedSection from './PrePackagedSection';
import BellatrixSupportSection from './BellatrixSupportSection';
import PayPerUseSection from './PayPerUseSection';
import CustomerSupport from './CustomerSupport';
import WhyChoeseBellatrix from './WhyChoeseBellatrix';
import BellatrixSupportHero from './BellatrixSupportHero';

const Support = () => {
    return (
        <>
            <BellatrixSupportHero />
            <SupportSecondSec />
            <SherpaCareServices />
            <WhatWeOfferSection />
            <DedicatedTeamSection />
            <PrePackagedSection />
            <BellatrixSupportSection />
            <PayPerUseSection />
            <CustomerSupport />
            <WhyChoeseBellatrix />
        </>
    );
}

export default Support;
