var iteration =-1;
function show(values)
{
    iteration++;
    //console.log("called show function");
    var simulatearea=document.getElementById("simulate-area");
    var h1=document.createElement("h1");
    h1.innerHTML="After iteration "+iteration.toString();
    simulatearea.appendChild(h1);
    var table=document.createElement("table");
    var tr=document.createElement("tr");
    var td=document.createElement("td");
    var text="serial";
    td.innerHTML=text;
    tr.appendChild(td);
    total=unique.length+1;
    total=100/total;
    for(i=0;i<unique.length;i++)
    {
        td=document.createElement("td");
        td.innerHTML = unique[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    for(i=0;i<values.length;i++)
    {
        tr=document.createElement("tr");
        val=i+1;
        text=""+val;
        td=document.createElement("td");
        td.style.cssText='width:'+total+'%;';
        td.innerHTML=text;
        tr.appendChild(td);
        var value=values[i];
        //console.log(value);
        for(j=0;j<value.length;j++)
        {
            //console.log(value[j]);
            td=document.createElement("td");
            if(value[j]>='a' && value[j]<='z')
                val='1';
            else if(value[j]>="A" && value[j]<="Z")
                val='0';
            else val=value[j];
            text=""+val;
            td.innerHTML=text;
            tr.appendChild(td);

           // console.log(value[j]);
            //console.log(" ");
        }
        table.appendChild(tr);
        //console.log("\n");
    }
    simulatearea.appendChild(table);
}

function play()
{
    iteration=-1;
    var simu=document.getElementById("simulate-area");
    simu.innerHTML="";
    var inp=document.getElementById("exp");
    var exp=inp.value; //getting the value from input field
    //console.log(exp);

    var values=exp.split("+");//spliting the expression by
    unique=[];
    //taking the unique char in expression
    for(i=0;i<values[0].length;i++)
    {
        if(values[0][i]>='A' && values[0][i]<='Z')
        {
            ch = values[0][i].charCodeAt(0)+32;
            ch = String.fromCharCode(ch);
        }
        else
            ch=values[0][i];
        unique[i]=ch;
    } 

    show(values);


    var flag=1;
    while(flag)
    {
        var temp=values;
        values=new Array([]);

        flag=0;
        var counter=0;
        var pos=-1;
        var arr=new Array();
        for(i=0;i<temp.length-1;i++)
        {
            for(j=i+1;j<temp.length;j++)
            {
                //console.log(temp[i]);
                //console.log(temp[j]);
                var a=temp[i];
                var b=temp[j];
                var  cc=0;
                for(ii=0;ii<a.length;ii++)
                {
                    if(a[ii]!=b[ii])
                    {
                        pos=ii;
                        cc++;
                    }
                }
                if(cc==1)
                {
                    arr[i]=1;
                    arr[j]=1;
                    //console.log(pos);
                    flag=1;
                    var str = temp[i].replaceAt(pos,'-');
                    //console.log(temp[i]);
                    values[counter]=str;
                    //console.log(values[counter]);
                    pos=-1;
                    counter++;
                    
                }
            }
        }
        for(i=0;i<temp.length;i++)
        {
            if(arr[i]!=1)
            {
                values[counter]=temp[i];
                counter++;
            }
        }
        //console.log(values);
        if(flag)
            show(values);
    }
    temp=values;
    arr=new Array();
    for(i=0;i<temp.length-1;i++)
    {
        for(j=i+1;j<temp.length;j++)
        {
            cc=0;
            a=temp[i];
            b=temp[j];
            for(ii=0;ii<a.length;ii++)
            {
                if(a[ii]!=b[ii])
                {
                    cc++;
                }
            }
            if(cc==0)
            {
                arr[j]=1;
            }
        }
    }
    values=new Array([]);
    counter=0;
    for(i=0;i<temp.length;i++)
    {
        if(arr[i]!=1)
        {
            values[counter]=temp[i];
            counter++;
        }
    }
    show(values);

    getExp(values);
    //tempstart=finish;
    //tempfinish=finish;
}

function getExp(values)
{
    str=new Array();
    ccc=0;
    for(i=0;i<values.length;i++)
    {
        value=values[i];
        for(j=0;j<value.length;j++)
        {
            //console.log(value[j]);
            if(value[j]!="-")
            {
                str[ccc]=value[j];
                ccc++;
            }
        }
        if(i<values.length-1)
        {
            str[ccc]="+";
            ccc++;
        }
    }
    var simu=document.getElementById("simulate-area");
    var h1=document.createElement("h1");
    h1.innerHTML="Minimized Expression";
    simu.appendChild(h1);
    h1=document.createElement("h1");
    ss="";
    for(i=0;i<ccc;i++)
    {
        ss+=str[i];
    }
    h1.innerHTML=ss;
    simu.appendChild(h1);
}

String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
}
