# Contributing to TechTea

First off, thank you for considering contributing to TechTea! 🎉

## Code of Conduct

This project and everyone participating in it is governed by respect, inclusivity, and professionalism. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear title**
- **Provide detailed description**
- **Explain why this enhancement would be useful**
- **List similar features in other apps** (if applicable)

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes**
3. **Test thoroughly**
4. **Update documentation** if needed
5. **Follow the code style**
6. **Write meaningful commit messages**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/techtea.git
cd techtea

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run development server
npm run dev
```

## Code Style

- Use TypeScript for all new code
- Follow existing formatting (Prettier/ESLint)
- Write meaningful variable/function names
- Add comments for complex logic
- Keep components small and focused

### Component Structure

```typescript
// Good component structure
'use client'

import { useState } from 'react'
import { ComponentProps } from '@/lib/types'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false)

  const handleClick = () => {
    // Logic here
    onAction()
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={handleClick} className="btn-primary">
        Action
      </button>
    </div>
  )
}
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add social sharing to update cards
fix: resolve blockchain verification issue
docs: update API integration guide
style: format code with prettier
refactor: simplify leaderboard calculation
test: add tests for room creation
chore: update dependencies
```

## Testing

Before submitting a PR:

```bash
# Type check
npm run build

# Lint
npm run lint

# Manual testing
npm run dev
```

## Project Structure

```
app/          - Next.js pages and layouts
components/   - Reusable React components
lib/          - Core libraries and utilities
  contexts/   - React Context providers
  services/   - API service integrations
  stores/     - State management (Zustand)
  types/      - TypeScript type definitions
  utils/      - Helper functions
public/       - Static assets
```

## Key Technologies

- **Next.js 14**: App Router, Server Components
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Framer Motion**: Animations
- **Ethers.js**: Blockchain interaction
- **Socket.io**: Real-time features

## Adding New Features

### 1. Create an Issue
Discuss the feature before implementing

### 2. Branch Naming
```bash
git checkout -b feature/amazing-feature
git checkout -b fix/bug-description
git checkout -b docs/documentation-update
```

### 3. Implementation
- Follow existing patterns
- Add proper TypeScript types
- Handle errors gracefully
- Consider mobile responsiveness

### 4. Testing
- Test all user flows
- Check responsive design
- Verify accessibility
- Test PWA features

### 5. Documentation
- Update README if needed
- Add JSDoc comments
- Update SETUP.md for new integrations

### 6. Pull Request
- Link related issues
- Describe changes clearly
- Add screenshots/GIFs
- Request review

## Integration Guidelines

### Adding New Platform Integration

1. Create service in `lib/services/`
```typescript
// lib/services/newplatform.ts
export class NewPlatformService {
  async getUserData(username: string) {
    // Implementation
  }
}
```

2. Add to types
```typescript
// lib/types/index.ts
export interface NewPlatformData {
  // Data structure
}
```

3. Update settings page
4. Add to leaderboard calculation
5. Document in README

## Performance Considerations

- Lazy load components when possible
- Optimize images
- Minimize bundle size
- Use React.memo for expensive components
- Implement proper caching

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast

## Questions?

- 💬 Open a discussion on GitHub
- 📧 Email: dev@techtea.app
- 🐦 Twitter: @techtea_app

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TechTea! ☕