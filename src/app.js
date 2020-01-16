import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { sounds, keys, names, keyCodes } from './sounds'
import 'normalize.css'
import './styles/styles.scss'

class DrumMachine extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayText: ''
        }
    }

    handleDisplay = (text) => {
        this.setState(() => ({
            displayText: text
        }))
    }

    render() {
        return (
            <div id="drum-machine">
                <DrumBank handleDisplay={this.handleDisplay} />
                <Display displayText={this.state.displayText} />
            </div>
        )
    }
}

class DrumBank extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const padsArr = Array.from(document.querySelectorAll('.drum-pad'))

        document.addEventListener('keydown', (e) => {
            keyCodes.forEach((keyCode, i) => {
                if (keyCode === e.keyCode) {
                    const audio = padsArr[i].childNodes[0]

                    this.props.handleDisplay(padsArr[i].id)
                    $('#' + padsArr[i].id).animate({
                        height: 40,
                        width: 40
                    }, 50)
                    $('#' + padsArr[i].id).animate({
                        height: 50, 
                        width: 50, 
                    }, 50)
                    
                    audio.load()
                    audio.play()
                }
            })
        })
    }

    handleClick = (e) => {
        const audio = e.target.childNodes[0]

        this.props.handleDisplay(e.target.id)
        $('#' + e.target.id).animate({
            height: 40,
            width: 40
        }, 50)
        $('#' + e.target.id).animate({
            height: 50, 
            width: 50, 
        }, 50)

        audio.load()
        audio.play()
    }

    render() {
        return (
            <div id="drum-bank">
                {sounds.map((sound, i) => (
                    <DrumPad 
                        text={keys[i]}
                        sound={sound}
                        key={i}
                        name={names[i]}
                        handleClick={this.handleClick}
                    />
                ))}
            </div>
        )
    }
}


const DrumPad = (props) => (
    <div 
        className="drum-pad"
        id={props.name}
        onClick={props.handleClick}
    >
        <audio 
            src={props.sound}
            className="clip"
            id={props.text}
            
        >
        </audio>
        {props.text}
    </div>
)

const Display = (props) => (
    <div 
        id="display"
        hidden={!props.displayText}
    >
        {props.displayText}
    </div>
)

ReactDOM.render(<DrumMachine />, document.getElementById('root'))