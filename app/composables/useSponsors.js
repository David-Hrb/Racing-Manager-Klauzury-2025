import sponsors from '~/assets/json/sponzors.json'
import sponsorsmoney from '~/assets/json/sponzorsmoney.json'
import sponsorsnationality from '~/assets/json/sponzorsnation.json'

export const useSponsors = () => {

  const getSponsor = (num) => {
    const sponsorsname = sponsors[num.toString()];
    const sponsormoney = sponsorsmoney[num.toString()];
    const sponsornationality = (sponsorsnationality[num.toString()] || '').toLowerCase();
    
    return { sponsorsname, sponsormoney, sponsornationality };
  }
  
  return { getSponsor };
}
