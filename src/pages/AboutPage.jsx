import React from 'react';
import aboutYarnAndNeedles from '../assets/About/aboutYarnAndNeedles.jpg';
import aboutDuck           from '../assets/About/aboutDuckImage.webp';
import aboutChristian      from '../assets/About/aboutChristian.webp';

const ABOUT_BODY = `Hello!

I'm Ali, also known as Ali Corah, and I'm pleased you've popped by here to see more about the creation of Fitting in Knitting, which has come about over years of lovely knitting, combined with hard work and stressing and nail biting...

My boss retired at the end of December 2017, and prior to this she had given me fantastic support and encouragement over a few years with my day job. This prompted me to make something extra special to express my gratitude. I thought these two little ducks would be perfect, made from a pattern given to me by my late grandma. It was this that reignited my love of knitting. I wanted to get back into something I really enjoy but have lost touch with over the years.

With my husband just starting his website on bits of DIY around the house, I became a bit of a website widow. Plenty of time for knitting on my own, but I thought it might be a nice idea to do a bit of a website myself, as a bit of a hobby too.`;

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>The Creation of Fitting in Knitting</h1>
      <p className="about-page__subtitle">
        A warm, spread-out story of gratitude, knitting, and making something special.
      </p>
      <div className="about-page__layout">
        <div className="about-page__text">
          {ABOUT_BODY.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="about-page__gallery">
          <img src={aboutDuck}           alt="Knitted duck and yarn"      className="about-page__image about-page__image--hero" />
          <div className="about-page__gallery-row">
            <img src={aboutYarnAndNeedles} alt="Yarn and needles"           className="about-page__image" />
            <img src={aboutChristian}      alt="Knitted pieces on display"  className="about-page__image" />
          </div>
        </div>
      </div>
    </div>
  );
}
