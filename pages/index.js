import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Button from "@oreillymedia/design-system/Button";
import Modal from "@oreillymedia/design-system/Modal";
import Footer from "@oreillymedia/design-system/AnonymousFooter";

import { Grid, Row, Column } from "@oreillymedia/design-system/Grid";

export default () => (
  <div>
    <Head title="Home" />
    <Grid>
      <Row>
        <Column col={{ medium: 8 }}>
          <Modal open={true}>
            <SearchBar
              ariaHidden={true}
              inputLabel="Search"
              placeholder="Find you some content"
              onChange={() => console.log("onChange")}
              onSearch={() => console.log("onSearch")}
            />
          </Modal>
        </Column>
        <Column col={{ medium: 4 }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. !
          </p>
        </Column>
      </Row>
    </Grid>
    <Footer />
  </div>
);
