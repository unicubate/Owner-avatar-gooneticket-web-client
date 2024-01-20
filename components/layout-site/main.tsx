interface IProps {
  children: React.ReactNode
}

const Main = ({ children }: IProps) => {
  return (
    <main>
      <div className="mx-auto mb-10 lg:flex">{children}</div>
    </main>
  )
}

export default Main
