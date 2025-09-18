# Modern Portfolio Website

A modern, responsive personal portfolio website built with HTML5, CSS3, and JavaScript, featuring a dark theme with blue/purple accents and interactive animations.

## 🚀 Features

- **Modern Dark Theme**: Professional dark design with blue/purple gradient accents
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Animations**: Smooth scroll animations, particle background, typewriter effects
- **Performance Optimized**: Fast loading, lazy loading, efficient animations
- **Accessibility Compliant**: WCAG guidelines, keyboard navigation, screen reader friendly
- **SEO Optimized**: Semantic HTML, meta tags, structured data

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── main.css        # Comprehensive CSS with dark theme
├── js/
│   └── main.js         # Interactive JavaScript functionality
├── assets/
│   ├── favicon.ico     # Website icon
│   ├── projects/       # Project screenshots (to be added)
│   └── resume.pdf      # Resume file (to be added)
└── README.md          # Project documentation
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Dark backgrounds (`#0a0a0a`, `#1a1a2e`)
- **Accents**: Blue/Purple gradients (`#4f46e5`, `#7c3aed`)
- **Text**: White primary, gray secondary (`#ffffff`, `#a1a1aa`)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono
- **Responsive sizing**: Scales appropriately across devices

### Animations
- Particle background system
- Typewriter text effect
- Smooth scroll interactions
- Hover animations and transitions
- Loading screen with progress

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

### Mobile Features
- Hamburger menu navigation
- Touch-optimized interactions
- Optimized layout stacking
- Performance considerations

## 🔧 Technologies Used

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Grid, Flexbox, Custom Properties, Animations
- **JavaScript ES6+**: Classes, Modules, Async/Await
- **Font Awesome**: Icon library
- **Google Fonts**: Typography

## 🎯 Sections

### 1. Hero Section
- Animated particle background
- Typewriter effect for role titles
- Call-to-action buttons
- Professional image placeholder

### 2. About Section
- Personal introduction
- Animated statistics counters
- Skills overview
- Resume download

### 3. Skills Section
- Interactive skill bars with animations
- Technology icons with hover effects
- Categorized skill groups
- Progress animations on scroll

### 4. Projects Section
- Featured project cards
- Live demo and source code links
- Technology tags
- Project filtering system
- Hover animations

### 5. Contact Section
- Working contact form with validation
- Social media links
- Professional contact information
- Real-time form validation

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for full functionality)

### Installation
1. Clone or download the project
2. Open `index.html` in a web browser
3. For full functionality, serve through a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Customization

#### Personal Information
1. Replace placeholder text in `index.html`:
   - Update name and title in hero section
   - Modify about section content
   - Update contact information
   - Add your social media links

#### Project Showcase
1. Add project screenshots to `assets/projects/`
2. Update project information in the projects section
3. Link to your actual project repositories

#### Colors & Styling
1. Modify CSS custom properties in `main.css`:
   ```css
   :root {
     --accent-blue: #your-color;
     --accent-purple: #your-color;
     /* Add your custom colors */
   }
   ```

#### Content Updates
1. Replace skill percentages with your actual skills
2. Update project descriptions and technologies
3. Add your resume PDF to `assets/`

## 🎨 Key Features Explanation

### Particle Background System
- Canvas-based particle animation
- Mouse interaction effects
- Performance optimized with RequestAnimationFrame
- Responsive particle density

### Typewriter Effect
- Multiple text rotation
- Configurable typing speed
- Cursor blinking animation
- Smooth text transitions

### Intersection Observer Animations
- Scroll-triggered animations
- Performance optimized
- Skill bar progress animations
- Counter animations

### Contact Form
- Real-time validation
- User-friendly error messages
- Accessible form design
- Success/error notifications

### Project Filter
- Category-based filtering
- Smooth animations
- Active state management
- Accessible button states

## 📊 Performance Features

- **Lazy Loading**: Images and assets load as needed
- **Optimized Animations**: Hardware acceleration, reduced motion support
- **Efficient Event Handling**: Throttled scroll listeners
- **Preloaded Resources**: Critical CSS and fonts
- **Service Worker Ready**: PWA capabilities prepared

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Reduced Motion Support**: Respects user preferences
- **High Contrast Support**: Color scheme adaptation

## 🔧 Browser Support

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

## 📝 Customization Guide

### Adding New Projects
```html
<div class="project-card" data-category="web">
  <div class="project-image">
    <img src="./assets/projects/your-project.jpg" alt="Project Name">
    <div class="project-overlay">
      <div class="project-links">
        <a href="your-demo-link" class="project-link" target="_blank">
          <i class="fas fa-external-link-alt"></i>
          Live Demo
        </a>
        <a href="your-github-link" class="project-link">
          <i class="fab fa-github"></i>
          Source Code
        </a>
      </div>
    </div>
  </div>
  <div class="project-content">
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Your project description</p>
    <div class="project-tech">
      <span class="tech-tag">Technology 1</span>
      <span class="tech-tag">Technology 2</span>
    </div>
  </div>
</div>
```

### Adding New Skills
```html
<div class="skill-item">
  <div class="skill-info">
    <span class="skill-name">New Skill</span>
    <span class="skill-percentage">85%</span>
  </div>
  <div class="skill-bar">
    <div class="skill-progress" data-width="85"></div>
  </div>
</div>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Blog integration
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced project filtering
- [ ] Animation timeline controls
- [ ] Performance analytics
- [ ] CMS integration

## 📞 Contact & Support

For questions, suggestions, or support:
- Email: your.email@example.com
- GitHub: @yourusername
- LinkedIn: your-linkedin-profile

---

Built with ❤️ using modern web technologies