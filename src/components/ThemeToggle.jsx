function ThemeToggle() {
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <svg className="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        <line x1="10" y1="2" x2="10" y2="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="10" y1="16" x2="10" y2="18" stroke="currentColor" strokeWidth="2"/>
        <line x1="2" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="2"/>
        <line x1="16" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
        <line x1="14.36" y1="14.36" x2="15.78" y2="15.78" stroke="currentColor" strokeWidth="2"/>
        <line x1="4.22" y1="15.78" x2="5.64" y2="14.36" stroke="currentColor" strokeWidth="2"/>
        <line x1="14.36" y1="5.64" x2="15.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <svg className="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 10.5C17 14.6421 13.6421 18 9.5 18C5.35786 18 2 14.6421 2 10.5C2 6.35786 5.35786 3 9.5 3C9.67442 3 9.84744 3.00663 10.0189 3.01971C8.20273 4.17787 7 6.22346 7 8.5C7 11.8137 9.68629 14.5 13 14.5C15.2765 14.5 17.3221 13.2973 18.4803 11.4811C18.4934 11.6526 18.5 11.8256 18.5 12C18.5 12.1667 17.8333 10.6667 17 10.5Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </button>
  );
}

export default ThemeToggle;
