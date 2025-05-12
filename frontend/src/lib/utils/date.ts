
export { 
  formatDate, 
}

/** ISO date string => dd/mm/yyyy format
 * @param isoDate - ISO date string
 * @returns dd/mm/yyyy string
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  
  return `${day}/${month}/${year}`
}




