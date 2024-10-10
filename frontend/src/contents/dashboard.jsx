import {Avatar, Button, Card, Divider, List, Slider, Typography} from "antd";
import {useState} from "react";


function Dashboard({model}) {
    const [data, setData] = useState([])
    const [sliderValue, setSliderValue] = useState(
        Math.floor((model.maxValue - model.minValue) / 2)
    )

    function addItem() {
        const item = {
            value: sliderValue,
            datetime: new Date()
        }

        setData([...data, item])
    }

    return (
        <Card style={{width: "320px", height: "450px"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h>{model.title}</h>
                <Button onClick={addItem} type="primary">
                    Внести
                </Button>
            </div>
            <List

                size="small"
                itemLayout="horizontal"
                bordered
                dataSource={data.slice().reverse()}
                renderItem={(item, index) => (
                    <List.Item style={{alignItems: "center", display: "flex", gap: "45px"}}>
                        <div style={{alignItems: "center", display: "flex", gap: "10px"}}>

                            <img height="30" width="30" src={model.getImageSource(item.value)} alt="status">
                            </img>

                            <b>
                                {model.getLabel(item.value)}
                            </b>
                        </div>

                        {`${item.datetime.getHours().toString().padStart(2, '0')}:${item.datetime.getMinutes().toString().padStart(2, '0')}`}



                    </List.Item>
                )}>

            </List>
            <Slider  tooltip={{
                open: false,
            }} range defaultValue={[model.minValue, model.maxValue]} value={sliderValue} onChange={setSliderValue}></Slider>

        </Card>
    )
}

export default Dashboard;
