# Form Styling Guide

This guide shows how to apply enhanced CSS styling to form inputs without modifying the shadcn UI components.

## 🎨 Available CSS Classes

### 1. Basic Enhanced Inputs

#### Standard Input Enhancement
```jsx
<div className="form-group-enhanced">
  <label className="form-label-enhanced required">Full Name</label>
  <input 
    type="text" 
    placeholder="Enter your full name"
  />
</div>
```

#### Textarea Enhancement
```jsx
<div className="form-group-enhanced">
  <label className="form-label-enhanced">Description</label>
  <textarea 
    placeholder="Enter description"
    className="form-textarea-enhanced"
  />
</div>
```

#### Select Dropdown Enhancement
```jsx
<div className="form-group-enhanced">
  <label className="form-label-enhanced">Category</label>
  <div className="form-select-enhanced">
    <select>
      <option>Select an option</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </div>
</div>
```

### 2. Input Variants

#### Primary Input
```jsx
<input 
  type="text" 
  className="form-input-primary"
  placeholder="Primary input"
/>
```

#### Success Input
```jsx
<input 
  type="text" 
  className="form-input-success"
  placeholder="Success input"
/>
```

#### Warning Input
```jsx
<input 
  type="text" 
  className="form-input-warning"
  placeholder="Warning input"
/>
```

#### Error Input
```jsx
<input 
  type="text" 
  className="form-input-error"
  placeholder="Error input"
/>
```

### 3. Floating Label Effect

```jsx
<div className="form-floating-label">
  <input 
    type="text" 
    id="floating-input"
    placeholder=" "
  />
  <label htmlFor="floating-input">Floating Label</label>
</div>
```

### 4. Input with Icon

```jsx
<div className="form-input-with-icon">
  <input 
    type="email" 
    placeholder="Enter email"
  />
  <span className="input-icon">📧</span>
</div>
```

### 5. File Upload Enhancement

```jsx
<div className="form-group-enhanced">
  <label className="form-label-enhanced">Upload File</label>
  <div className="form-file-enhanced">
    <input type="file" id="file-upload" />
    <label htmlFor="file-upload" className="file-label">
      📁 Choose file or drag and drop
    </label>
  </div>
</div>
```

### 6. Checkbox and Radio Enhancement

#### Checkbox
```jsx
<div className="form-checkbox-enhanced">
  <input type="checkbox" id="terms" />
  <label htmlFor="terms">I agree to the terms and conditions</label>
</div>
```

#### Radio Button
```jsx
<div className="form-radio-enhanced">
  <input type="radio" id="option1" name="options" />
  <label htmlFor="option1">Option 1</label>
</div>
```

### 7. Form Sections

#### Complete Form Section
```jsx
<div className="form-section">
  <div className="form-section-header">
    <h3 className="form-section-title">Personal Information</h3>
    <p className="form-section-description">Please provide your personal details</p>
  </div>
  
  <div className="form-grid">
    <div className="form-group-enhanced">
      <label className="form-label-enhanced required">First Name</label>
      <input type="text" className="form-input-enhanced" />
    </div>
    
    <div className="form-group-enhanced">
      <label className="form-label-enhanced required">Last Name</label>
      <input type="text" className="form-input-enhanced" />
    </div>
    
    <div className="form-group-enhanced form-grid-full">
      <label className="form-label-enhanced">Email</label>
      <input type="email" className="form-input-enhanced" />
    </div>
  </div>
</div>
```

### 8. Error and Success Messages

```jsx
<div className="form-group-enhanced">
  <label className="form-label-enhanced">Email</label>
  <input 
    type="email" 
    className="form-input-enhanced form-input-error"
    placeholder="Enter email"
  />
  <div className="form-error">
    <span>⚠️</span>
    <span>Please enter a valid email address</span>
  </div>
</div>

<div className="form-group-enhanced">
  <label className="form-label-enhanced">Email</label>
  <input 
    type="email" 
    className="form-input-enhanced form-input-success"
    placeholder="Enter email"
  />
  <div className="form-success">
    <span>✅</span>
    <span>Email looks good!</span>
  </div>
</div>
```

### 9. Help Text

```jsx
<div className="form-group-enhanced">
  <label className="form-label-enhanced">Password</label>
  <input 
    type="password" 
    className="form-input-enhanced"
    placeholder="Enter password"
  />
  <div className="form-help">
    Password must be at least 8 characters long
  </div>
</div>
```

### 10. Responsive Form Grid

```jsx
<div className="form-grid">
  <div className="form-group-enhanced">
    <label className="form-label-enhanced">First Name</label>
    <input type="text" className="form-input-enhanced" />
  </div>
  
  <div className="form-group-enhanced">
    <label className="form-label-enhanced">Last Name</label>
    <input type="text" className="form-input-enhanced" />
  </div>
  
  <div className="form-group-enhanced form-grid-full">
    <label className="form-label-enhanced">Address</label>
    <textarea className="form-input-enhanced form-textarea-enhanced" />
  </div>
</div>
```

## 🎯 Key Features

### ✨ Visual Enhancements
- **Rounded Corners**: Modern `rounded-xl` styling
- **Smooth Transitions**: 300ms duration for all interactions
- **Hover Effects**: Subtle scale and shadow changes
- **Focus States**: Blue ring and border highlighting
- **Validation States**: Color-coded borders for success/error

### 🎨 Interactive Elements
- **Scale Animation**: Inputs scale slightly on focus
- **Shadow Progression**: Subtle to prominent shadows
- **Color Transitions**: Smooth color changes
- **Icon Integration**: Support for input icons

### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Grid Layouts**: Responsive form grids
- **Flexible Sizing**: Adapts to different screen sizes

### ♿ Accessibility
- **Focus Indicators**: Clear focus states
- **Color Contrast**: Proper contrast ratios
- **Screen Reader Support**: Semantic HTML structure
- **Keyboard Navigation**: Full keyboard support

## 🚀 Usage Examples

### Complete Form Example
```jsx
<form className="form-section form-animate-in">
  <div className="form-section-header">
    <h3 className="form-section-title">Create New Asset</h3>
    <p className="form-section-description">Fill in the details to create a new patent asset</p>
  </div>
  
  <div className="form-grid">
    <div className="form-group-enhanced">
      <label className="form-label-enhanced required">Asset Name</label>
      <input 
        type="text" 
        className="form-input-enhanced form-input-primary"
        placeholder="Enter asset name"
      />
    </div>
    
    <div className="form-group-enhanced">
      <label className="form-label-enhanced">Category</label>
      <div className="form-select-enhanced">
        <select className="form-input-enhanced">
          <option>Select category</option>
          <option>Technology</option>
          <option>Design</option>
        </select>
      </div>
    </div>
    
    <div className="form-group-enhanced form-grid-full">
      <label className="form-label-enhanced">Description</label>
      <textarea 
        className="form-input-enhanced form-textarea-enhanced"
        placeholder="Enter detailed description"
      />
    </div>
  </div>
</form>
```

## 🎨 Customization

All classes use Tailwind CSS and can be easily customized by modifying the CSS variables or extending the classes in your `globals.css` file.

The styling system is designed to work alongside shadcn UI components without conflicts, providing enhanced visual appeal while maintaining functionality.
