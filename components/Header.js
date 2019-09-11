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
    <head>
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />
    </head>

    <Link href="/">
      <a style={linkHeadStyle}>Snowball VS Avalanche</a>
    </Link>
    <a
      style={linkStyle}
      href="https://en.wikipedia.org/wiki/Debt-snowball_method"
    >
      Snowball
    </a>
    <a
      style={linkStyle}
      href="https://www.investopedia.com/terms/d/debt-avalanche.asp"
    >
      Avalanche
    </a>
  </div>
);

export default Header;
