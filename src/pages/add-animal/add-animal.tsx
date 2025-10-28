const AddAnimal = () => {
  return (
    <div className="Add-Animal-container">
      <div className="title">HealthyPet</div>
      <div className="subtitle">Add new animal form</div>
      <div className="description">
        What type of animal it is? Select one of the options
      </div>
      <div className="animal-select">
        <div>
          <button>Cat</button>
        </div>
        <div>
          <button>Dog</button>
        </div>
        <div>
          <button>Bird</button>
        </div>
        <div>
          <button>Rabbit</button>
        </div>
        <div>
          <button>Reptile</button>
        </div>
        <div>
          <button>Turtle</button>
        </div>
        <div>
          <button>Other</button>
        </div>
      </div>
      <form className="animal-form">
        <div>
          <label>Animal name *</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Breed*</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Specie</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Birth date*</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Gender *</label>
          <select required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label>Weight *</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Coloring *</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Microchip / ID Number</label>
          <input type="text"></input>
        </div>
      </form>
      <div className="buttons">
        <button>ADD MEDICAL RECORDS</button>
        <button>SAVE AND EXIT</button>
      </div>
    </div>
  );
};

export default AddAnimal;
