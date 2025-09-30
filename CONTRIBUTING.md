# Contributing to TechTea

Thank you for your interest in contributing to TechTea! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/techtea.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development Setup

```bash
npm install
npm run dev
```

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use Tailwind CSS for styling
- Keep components small and focused
- Add comments for complex logic

## Component Guidelines

### File Structure
```typescript
'use client' // if client component

import { ... } from '...'

interface ComponentProps {
  // props type
}

export default function Component({ props }: ComponentProps) {
  // component logic
  
  return (
    // JSX
  )
}
```

### Styling
- Use Tailwind utility classes
- Follow the design system colors
- Maintain responsive design (mobile-first)
- Use card, btn-primary, btn-secondary utility classes

### State Management
- Use Zustand store for global state
- Use local state for component-specific data
- Persist important data to localStorage

## Feature Requests

### Before Adding Features
1. Check existing issues
2. Create an issue to discuss
3. Wait for feedback
4. Implement after approval

### Feature Checklist
- [ ] Follows design system
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation, ARIA)
- [ ] Tested on multiple browsers
- [ ] Documentation updated

## Bug Reports

### Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information

## Testing

### Manual Testing
- Test on Chrome, Firefox, Safari
- Test on mobile devices
- Test PWA installation
- Test offline functionality

### Areas to Test
- Room creation/joining
- Update posting
- Leaderboard calculations
- Social sharing
- Integrations
- Settings

## Pull Request Guidelines

### PR Title Format
- `feat: Add feature description`
- `fix: Fix bug description`
- `docs: Update documentation`
- `style: Style improvements`
- `refactor: Code refactoring`

### PR Description
- What changes were made
- Why these changes are needed
- How to test the changes
- Screenshots (if UI changes)

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] No console.log statements
- [ ] Documentation updated
- [ ] Works on mobile and desktop

## Code Review Process

1. Maintainer reviews PR
2. Feedback provided if needed
3. You make requested changes
4. Approval and merge

## Community

- Be respectful and inclusive
- Help others learn
- Share knowledge
- Have fun building together!

## Questions?

Open an issue or reach out to maintainers.

Thank you for contributing! ☕