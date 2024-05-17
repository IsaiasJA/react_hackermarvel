import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
mutation PostMutation(
    $url: String!
    $name: String!
    $description: String!
    $comic: String!
  ) {
    createLink(url: $url, name: $name, description: $description, comic: $comic) {
      id
      url
      name
      description
      comic
    }
  }
`;

const CreateLink = () => {
const navigate = useNavigate();

  const [formState, setFormState] = useState({
    url: '',
    name: '',
    description: '',
    comic: ''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: formState.url,
      name: formState.name,
      description: formState.description,
      comic: formState.comic
    },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="URL de la imagen"
          />
          <input
            className="mb2"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Nombre del Heroe"
          />
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="Descripcion del Heroe"
          />
          <input
            className="mb2"
            value={formState.comic}
            onChange={(e) =>
              setFormState({
                ...formState,
                comic: e.target.value
              })
            }
            type="text"
            placeholder="Comic en el que aparece"
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CreateLink;