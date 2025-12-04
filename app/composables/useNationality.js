import nationality from '~/assets/json/nationality.json'
export const useNationality = (nationalityCode) => {
    const upperCode = nationalityCode ? nationalityCode.toUpperCase() : '';
    return nationality[upperCode] || "Neznámá národnost";
}
