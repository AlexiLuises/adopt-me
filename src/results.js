import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            animals={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

{
  /* // {pets.map((pet) => (
        //     // component
        //     <Pet
        //       name={pet.name}
        //       animal={pet.animal}
        //       breed={pet.breed}
        //       key={pet.id}
        //     />
        //   ))} */
}
export default Results;
