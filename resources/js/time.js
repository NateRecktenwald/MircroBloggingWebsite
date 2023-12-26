const time_content = document.getElementById("content");
const time_children = time_content.children;

for(let i = 1; i < time_children.length; i++) {

    try {
        //get all of the string data needed to contruct a better lookig time string
        const curr_time_element = document.getElementById(time_children[i].children[4].id);
        const curr_time_string = curr_time_element.innerText.split(" ");
        const military_time = curr_time_string[4].split(":")
        const mins = military_time[1];
        let hour = parseInt(military_time[0]);
        let time_label = "am";

        //convert to 12 hour clock
        if(hour > 12) {
            hour = hour - 12;
            time_label = "pm"
        }

        //contruct new string and change the element
        const new_time = curr_time_string[3] + " " + curr_time_string[1] + " " + curr_time_string[2] + " " + " " + hour.toString() 
                        + ":" + mins + time_label;
        curr_time_element.innerText = new_time;
    }
    catch {
        continue;
    }

    
}