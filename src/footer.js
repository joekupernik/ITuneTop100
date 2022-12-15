function Footer({ length }) {
    return (
        <footer>
            <p>Top 100 Albums</p>
            <p>{length} List {length === 1 ? "item" : "items"}</p>
        </footer>
    );
}

export default Footer;