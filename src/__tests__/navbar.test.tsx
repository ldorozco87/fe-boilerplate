describe('Navbar Component', () => {
  it('can be imported without errors', () => {
    // Verificar que el componente se puede importar
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('../components/layout/Navbar')
    }).not.toThrow()
  })

  it('has named export', () => {
    // Verificar que existe la exportación nombrada
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Navbar } = require('../components/layout/Navbar')
    expect(Navbar).toBeDefined()
  })

  it('is a React component', () => {
    // Verificar que es un componente de React
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Navbar } = require('../components/layout/Navbar')
    expect(typeof Navbar).toBe('function')
  })
})
