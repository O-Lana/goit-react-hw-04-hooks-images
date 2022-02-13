import { useState } from "react";
import './SearchBar.css';


export default function SearchBar({onSubmit}) {
    const [searchImages, setSearchImages] = useState('');

    const searchNameImages = event => {
        setSearchImages(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (searchImages.trim() === '') {
            alert('Введите слово для поиска');
            return;
        }

        onSubmit(searchImages);
        setSearchImages('');
    };

    return (
        <>
            <header className="searchBar">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <button type="submit" className="searchForm-button">
                        <span className="searchForm-button-label">Search</span>
                    </button>

                    <input
                        className="searchForm-input"
                        type="text"
                        name="searchImages"
                        value={searchImages}
                        onChange={searchNameImages}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        </>
        )

//*было
// export default class SearchBar extends Component {
//     state = {
//         searchImages: '',
//     };

    // searchNameImages = event => {
    //     this.setState({ searchImages: event.currentTarget.value.toLowerCase() });
    // };

    // handleSubmit = event => {
    //     event.preventDefault();

    //     if (this.state.searchImages.trim() === '') {
    //         alert('Введите слово для поиска');
    //         return;
    //     }

    //     this.props.onSubmit(this.state.searchImages);
    //     this.setState({ searchImages: '' });
    // };

    
//     render() {
//         return (
//             <>
//                 <header className="searchBar">
//                     <form className="searchForm" onSubmit={this.handleSubmit}>
//                         <button type="submit" className="searchForm-button">
//                             <span className="searchForm-button-label">Search</span>
//                         </button>

//                         <input
//                             className="searchForm-input"
//                             type="text"
//                             name="searchImages"
//                             value={this.state.searchImages}
//                             onChange={this.searchNameImages}
//                             autoComplete="off"
//                             autoFocus
//                             placeholder="Search images and photos"
//                         />
//                     </form>
//                 </header>
//             </>
//         )
//     };
};
