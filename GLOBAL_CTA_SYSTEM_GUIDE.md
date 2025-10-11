# Global CTA System Implementation Guide

This guide explains how to use the new global Call-to-Action (CTA) system that automatically opens a ContactModal for all CTA buttons across the project.

## 🚀 Overview

The global CTA system provides:
- **Unified Experience**: All CTA buttons open the same ContactModal
- **Automatic Detection**: Smart detection of CTA button types
- **Customizable**: Each CTA can have custom modal configurations
- **Easy Migration**: Simple conversion from existing buttons
- **Future-Proof**: New components automatically inherit the behavior

## 📁 File Structure

```
src/
├── components/
│   ├── ContactModal.jsx          # Standardized contact modal
│   ├── CTAButton.jsx             # Reusable CTA button component
│   └── hoc/
│       └── withCTAModal.jsx      # HOC for automatic CTA conversion
├── contexts/
│   └── CTAModalContext.jsx       # Global CTA modal context
└── utils/
    └── ctaUtils.js               # CTA detection and configuration utilities
```

## 🛠️ Core Components

### 1. CTAModalProvider
Wraps the entire app and provides global modal state management.

```jsx
// Already integrated in App.jsx
<CTAModalProvider>
  {/* Your app content */}
</CTAModalProvider>
```

### 2. CTAButton Component
A reusable button component that automatically opens the contact modal.

```jsx
import CTAButton from '../components/CTAButton';

<CTAButton
  variant="primary"
  size="lg"
  modalConfig={{
    title: "Get Started Today",
    subtitle: "Let's discuss your project requirements",
    icon: "🚀"
  }}
>
  Get Started
</CTAButton>
```

### 3. ContactModal Component
The standardized modal that displays the ContactForm.

```jsx
import ContactModal from '../components/ContactModal';

<ContactModal
  isOpen={isOpen}
  onClose={onClose}
  title="Contact Us"
  subtitle="Let's discuss your needs"
  icon="📧"
/>
```

## 🎯 Usage Patterns

### Pattern 1: Direct CTAButton Usage (Recommended)
Replace existing buttons with the CTAButton component:

```jsx
// Before
<button onClick={openModal} className="btn-primary">
  Get Started
</button>

// After
<CTAButton
  variant="primary"
  modalConfig={{
    title: "Get Started Today",
    subtitle: "Let's discuss your project",
    icon: "🚀"
  }}
>
  Get Started
</CTAButton>
```

### Pattern 2: HOC Wrapper
Wrap existing button components with the CTA HOC:

```jsx
import withCTAModal from '../components/hoc/withCTAModal';

const MyButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const CTAButton = withCTAModal(MyButton, {
  title: "Contact Us",
  subtitle: "Let's discuss your needs",
  icon: "📧"
});

// Usage
<CTAButton>Contact Us</CTAButton>
```

### Pattern 3: Context Hook
Use the context hook directly for custom implementations:

```jsx
import { useCTAModal } from '../contexts/CTAModalContext';

const MyComponent = () => {
  const { openCTAModal } = useCTAModal();
  
  const handleClick = () => {
    openCTAModal({
      title: "Custom Modal",
      subtitle: "Custom subtitle",
      icon: "🎯"
    });
  };
  
  return <button onClick={handleClick}>Custom CTA</button>;
};
```

## 🎨 Modal Configurations

### Pre-defined Configurations
The system includes pre-defined configurations for common CTA types:

- **Get Started**: "Let's discuss your project requirements"
- **Contact**: "We'd love to hear from you"
- **Request Demo**: "See our solutions in action"
- **Get Quote**: "Get a customized quote"
- **Learn More**: "Get detailed information"

### Custom Configuration
Each CTA can have custom modal configuration:

```jsx
<CTAButton
  modalConfig={{
    title: "Implementation Consultation",
    subtitle: "Let's discuss your NetSuite implementation needs",
    icon: "⚡"
  }}
>
  Start Implementation
</CTAButton>
```

## 🔧 Migration Guide

### Step 1: Update Existing Components
Replace existing CTA buttons with CTAButton:

```jsx
// Find patterns like this:
<button onClick={openModal}>Get Started</button>
<a href="#contact">Contact Us</a>

// Replace with:
<CTAButton modalConfig={{...}}>Get Started</CTAButton>
<CTAButton modalConfig={{...}}>Contact Us</CTAButton>
```

### Step 2: Remove Old Modal Code
Remove individual modal implementations:

```jsx
// Remove these patterns:
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

// Remove modal JSX:
{isModalOpen && <Modal>...</Modal>}
```

### Step 3: Update Props
Remove modal-related props from components:

```jsx
// Before
const MyComponent = ({ openModal, isModalOpen, closeModal }) => {
  // ...
};

// After
const MyComponent = () => {
  // Modal functionality is now global
};
```

## 🎯 Automatic CTA Detection

The system can automatically detect CTA buttons based on:

1. **Button Text Patterns**:
   - "Get Started", "Contact Us", "Request Demo"
   - "Learn More", "Book Now", "Download"

2. **CSS Classes**:
   - `.cta-button`, `.contact-btn`, `.primary-button`

3. **Click Handlers**:
   - Functions that open modals

## 📋 CTAButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | 'primary' | Button variant (primary, secondary, etc.) |
| `size` | string | 'md' | Button size (sm, md, lg, xl) |
| `className` | string | '' | Additional CSS classes |
| `modalConfig` | object | {} | Modal configuration |
| `href` | string | undefined | If provided, renders as link |
| `onClick` | function | undefined | Custom click handler |
| `disabled` | boolean | false | Disable button |
| `icon` | ReactNode | undefined | Icon to display |

## 🎨 Modal Configuration Object

```jsx
{
  title: "Modal Title",           // Modal header title
  subtitle: "Modal subtitle",     // Modal header subtitle
  icon: "🚀"                      // Modal header icon
}
```

## 🔄 Context API

### useCTAModal Hook
```jsx
const {
  isModalOpen,        // Current modal state
  modalConfig,        // Current modal configuration
  openCTAModal,       // Function to open modal
  closeCTAModal       // Function to close modal
} = useCTAModal();
```

### openCTAModal Function
```jsx
openCTAModal({
  title: "Custom Title",
  subtitle: "Custom subtitle",
  icon: "🎯"
});
```

## 🚀 Benefits

1. **Consistency**: All CTAs use the same modal and form
2. **Maintainability**: Single source of truth for contact functionality
3. **User Experience**: Unified experience across the site
4. **Developer Experience**: Easy to implement and maintain
5. **Future-Proof**: New components automatically get CTA functionality

## 🔍 Testing

To test the implementation:

1. **Check Modal Opening**: Click any CTA button to ensure modal opens
2. **Verify Content**: Ensure ContactForm appears in modal
3. **Test Customization**: Verify custom modal configurations work
4. **Check Responsiveness**: Test modal on different screen sizes

## 🐛 Troubleshooting

### Modal Not Opening
- Ensure CTAModalProvider wraps your app
- Check if CTAButton is imported correctly
- Verify modalConfig is properly passed

### Styling Issues
- Check if variant classes are applied correctly
- Ensure CSS variables are defined
- Verify Tailwind classes are available

### Context Errors
- Make sure useCTAModal is used within CTAModalProvider
- Check for proper imports

## 📝 Examples

### Basic CTA Button
```jsx
<CTAButton>Get Started</CTAButton>
```

### Customized CTA Button
```jsx
<CTAButton
  variant="secondary"
  size="lg"
  className="rounded-full"
  modalConfig={{
    title: "Implementation Consultation",
    subtitle: "Let's discuss your NetSuite needs",
    icon: "⚡"
  }}
>
  Start Implementation
</CTAButton>
```

### Link-style CTA
```jsx
<CTAButton
  href="/contact"
  modalConfig={{
    title: "Contact Us",
    subtitle: "Get in touch with our team",
    icon: "📧"
  }}
>
  Contact Us
</CTAButton>
```

This system provides a robust, scalable solution for managing CTA buttons across your entire application while maintaining consistency and improving user experience.
