import { Outlet } from "react-router-dom"
import Header from "../../components/common/headar/Headar"
import {Container} from "react-bootstrap"
export default function MainLayout() {
  return (
    <Container fluid>
      <Header/>
      <div>
        <Outlet/>
      </div>
    </Container>
  )
}
