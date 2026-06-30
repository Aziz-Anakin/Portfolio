import cursorLogo from '../assets/icons/cursor.png'
import ohmyzshLogo from '../assets/icons/ohmyzsh.png'
import wslLogo from '../assets/icons/wsl-tux.png'

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

// Stack & setup du quotidien. `invert` pour les logos monochromes sombres → blancs en mode nuit.
export const SETUP = [
  {
    label: 'Éditeurs',
    items: [
      { name: 'VS Code',       logo: `${DEV}/vscode/vscode-original.svg` },
      { name: 'IntelliJ IDEA', logo: `${DEV}/intellij/intellij-original.svg` },
      { name: 'Cursor',        logo: cursorLogo, invert: true },
    ],
  },
  {
    label: 'Environnement',
    items: [
      { name: 'WSL 2',     logo: wslLogo },
      { name: 'Ubuntu',    logo: `${DEV}/ubuntu/ubuntu-original.svg` },
      { name: 'Docker',    logo: `${DEV}/docker/docker-original.svg` },
      { name: 'Oh My Zsh', logo: ohmyzshLogo },
    ],
  },
]
