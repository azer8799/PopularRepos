// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterData, clickFilter, isActive} = props
  const {language, id} = filterData

  const buttonClass = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const displayFilter = () => {
    clickFilter(id)
  }

  return (
    <li>
      <button type="button" className={buttonClass} onClick={displayFilter}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
