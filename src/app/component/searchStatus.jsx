import React from "react";

const SearchStatus = ({ length }) => {
    const handlePhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return 'человек тусанет';
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут';
        if (lastOne === 1) return 'человек тусанет';
        return 'человек тусанет';
    };

    return (
        <div>
            <h2>
                <span className={"badge " + (length > 0 ? 'bg-primary' : 'bg-danger')}>
                    {length > 0 ?
                    `${length} ${handlePhrase(length)} с тобой сегодня` : 'Никто с тобой не тусанет'} 
                </span>
            </h2>
        </div>
    )
};

export default SearchStatus;

