//book class:represents a book

class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}


//ui class:handle ui tasks
class UI{
    static displayBooks(){
        const books =Store.getBooks();

        books.forEach(item=>{
            return UI.addBooksToList(item);
        });

    }

    static addBooksToList(book){
        const list=document.querySelector('#tbody');
        const row=document.createElement('tr');

        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><i class="fas fa-times-circle"></i></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#titleInput').value="";
        document.querySelector('#authorInput').value="";
        document.querySelector('#isbnInput').value="";
    }

    static deleteBook(el){
        let td=el.parentElement;

        el.classList.contains('fa-times-circle') ? document.querySelector('#tbody').removeChild(td.parentElement) : false;
    }
}


//store class:handles storage

class Store{
    static getBooks(){
        let books;

        localStorage.getItem('books')===null ? books=[] : books=JSON.parse(localStorage.getItem('books')) ;

        return books;
    } 

    static addBooks(book){
        const books =Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
        
    }

    static removeBook(isbn){
        const books=Store.getBooks();

        books.forEach((book,index)=>{
           if(book.isbn===isbn){
            books.splice(index,1);
           }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

console.log(Store.getBooks())

//event:display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event:add book
document.querySelector('#forms').addEventListener('submit',(e)=>{

    e.preventDefault();

    //get form values
    const title=document.querySelector('#titleInput').value;
    const author=document.querySelector('#authorInput').value;
    const isbn=document.querySelector('#isbnInput').value;

    const book= new Book(title,author,isbn);

    if(title===""||author===""||isbn==="" ){

        alert('input a digit')
    }else{

        //display the books
        UI.addBooksToList(book);

        //store the books
        Store.addBooks(book);

        //after the books have been added
        UI.clearFields();
    }


})

// event:remove a book
console.log(document.querySelector('#tbody'));

document.querySelector('#tbody').addEventListener('click',(e)=>{
    // console.log(e.target.parentElement);

    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

})