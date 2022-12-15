function Content({ items, handleSelectedAlbum }) {
  return (

    <ul>
      {items.map((item) => (
        <li className="item" key={item.index}>
          <label>{item.title.label}</label>
          <input type='Checkbox' checked={item.selected} onChange={() => { handleSelectedAlbum(item.id) }} />
        </li>
      )
      )}
    </ul>

  )
}

export default Content;
