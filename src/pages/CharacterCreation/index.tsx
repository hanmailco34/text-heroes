import CharacterCreationForm from "@/features/chreacter/CharacterCreationForm";

const CharacterCreationPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
            <CharacterCreationForm></CharacterCreationForm>
        </div>
    );
};

export default CharacterCreationPage;
