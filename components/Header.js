import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const linkHeadStyle = {
  marginRight: 15,
  fontSize: "1.5rem"
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkHeadStyle}>Snowball VS Avalanche</a>
    </Link>
    <a
      style={linkStyle}
      href="https://en.wikipedia.org/wiki/Debt-snowball_method"
      target="_blank"
      rel="noopener"
    >
      Snowball
    </a>
    <a
      style={linkStyle}
      href="https://www.investopedia.com/terms/d/debt-avalanche.asp"
      target="_blank"
      rel="noopener"
    >
      Avalanche
    </a>
  </div>
);

export default Header;
