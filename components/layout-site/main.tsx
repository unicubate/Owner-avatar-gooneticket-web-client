interface IProps {
  children: React.ReactNode
}

const Main = ({ children }: IProps) => {
  return (
    <main>
      <div className="mx-auto lg:flex mb-10">{children}</div>
    </main>
  )
}

export default Main
