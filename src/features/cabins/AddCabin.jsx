import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        add new Cabin
      </Button>
      {isOpenModal && (
        <Modal>
          <CreateCabinForm />
        </Modal>
      )}
    </div>
  );
}
